'use client';

import { useState, useEffect } from 'react';
import { PageConfig, Section } from '@/lib/db';
import { SECTION_SCHEMAS } from '@/components/sections/registry';
import { Button } from '@/components/ui/Button';
import {
    Plus, Trash2, GripVertical, Save, Monitor, Smartphone,
    GalleryHorizontal, Image as ImageIcon, LayoutGrid, Type,
    Info, Heart, MessageSquareQuote, GripHorizontal
} from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { createPage, fetchAllPages, fetchPageConfig, updatePageConfig } from '@/app/actions/design-actions';

import { exportData, importData } from '@/app/actions/backup-actions';
import { Download, Upload } from 'lucide-react';

// Map icon names to components
const ICON_MAP: Record<string, any> = {
    'GalleryHorizontal': GalleryHorizontal,
    'Image': ImageIcon,
    'LayoutGrid': LayoutGrid,
    'Type': Type,
    'Info': Info,
    'Heart': Heart,
    'MessageSquareQuote': MessageSquareQuote,
};

const BackupControls = () => {
    const handleExport = async () => {
        try {
            const data = await exportData();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (err) {
            alert('Failed to export data');
        }
    };

    const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                await importData(json);
                alert('Data restored successfully! Reloading...');
                window.location.reload();
            } catch (err) {
                alert('Failed to import data. Invalid file.');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="flex gap-1">
            <button onClick={handleExport} title="Download Backup" className="text-xs bg-white border border-gray-300 text-gray-700 px-2 py-1.5 rounded-md hover:bg-gray-50 transition-colors">
                <Download size={14} />
            </button>
            <label title="Restore Backup" className="text-xs bg-white border border-gray-300 text-gray-700 px-2 py-1.5 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                <Upload size={14} />
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
        </div>
    );
};

export default function DesignEditor() {
    const [pages, setPages] = useState<PageConfig[]>([]);
    const [selectedPageId, setSelectedPageId] = useState<string>('home');
    const [currentPage, setCurrentPage] = useState<PageConfig | null>(null);
    const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
    const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
    const [loading, setLoading] = useState(true);
    const [isCreatingPage, setIsCreatingPage] = useState(false);
    const [newPageName, setNewPageName] = useState('');
    const [showAddMenu, setShowAddMenu] = useState(false);

    useEffect(() => {
        loadPages();
    }, []);

    useEffect(() => {
        if (selectedPageId) {
            loadPageConfig(selectedPageId);
        }
    }, [selectedPageId]);

    const loadPages = async () => {
        const p = await fetchAllPages();
        setPages(p);
        setLoading(false);
    };

    const loadPageConfig = async (slug: string) => {
        setLoading(true);
        const config = await fetchPageConfig(slug);
        setCurrentPage(config);
        setLoading(false);
    };

    const handleSave = async () => {
        if (!currentPage) return;
        await updatePageConfig(currentPage.slug, currentPage);
        alert('Saved successfully!');
    };

    const handleCreatePage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPageName) return;

        const slug = newPageName.toLowerCase().replace(/[^a-z0-9]/g, '-');
        await createPage(newPageName, slug);
        setNewPageName('');
        setIsCreatingPage(false);
        loadPages();
        setSelectedPageId(slug);
    };

    const addSection = (type: string) => {
        if (!currentPage) return;
        const newSection: Section = {
            id: `${type.toLowerCase()}-${Date.now()}`,
            type,
            content: {},
            settings: { paddingTop: 'medium', paddingBottom: 'medium' }
        };
        setCurrentPage({
            ...currentPage,
            sections: [...currentPage.sections, newSection]
        });
        setSelectedSectionId(newSection.id);
        setShowAddMenu(false);
    };

    const removeSection = (id: string) => {
        if (!currentPage) return;
        setCurrentPage({
            ...currentPage,
            sections: currentPage.sections.filter(s => s.id !== id)
        });
        if (selectedSectionId === id) setSelectedSectionId(null);
    };

    const updateSection = (id: string, field: string, value: any) => {
        if (!currentPage) return;
        const updatedSections = currentPage.sections.map(s => {
            if (s.id === id) {
                return { ...s, content: { ...s.content, [field]: value } };
            }
            return s;
        });
        const updatedPage = { ...currentPage, sections: updatedSections };
        setCurrentPage(updatedPage);

        // Send live update to iframe
        const iframe = document.querySelector('iframe');
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({
                type: 'UPDATE_PAGE_CONFIG',
                payload: updatedPage
            }, '*');
        }
    };

    const updateSectionSettings = (id: string, field: string, value: any) => {
        if (!currentPage) return;
        const updatedSections = currentPage.sections.map(s => {
            if (s.id === id) {
                return { ...s, settings: { ...s.settings, [field]: value } };
            }
            return s;
        });
        const updatedPage = { ...currentPage, sections: updatedSections };
        setCurrentPage(updatedPage);

        // Send live update to iframe
        const iframe = document.querySelector('iframe');
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({
                type: 'UPDATE_PAGE_CONFIG',
                payload: updatedPage
            }, '*');
        }
    };

    // DND Sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id && currentPage) {
            const oldIndex = currentPage.sections.findIndex(s => s.id === active.id);
            const newIndex = currentPage.sections.findIndex(s => s.id === over.id);
            const updatedPage = {
                ...currentPage,
                sections: arrayMove(currentPage.sections, oldIndex, newIndex)
            };
            setCurrentPage(updatedPage);

            // Send live update to iframe
            const iframe = document.querySelector('iframe');
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage({
                    type: 'UPDATE_PAGE_CONFIG',
                    payload: updatedPage
                }, '*');
            }
        }
    };

    const toggleSectionVisibility = (id: string) => {
        if (!currentPage) return;
        const updatedSections = currentPage.sections.map(s => {
            if (s.id === id) {
                return { ...s, hidden: !s.hidden };
            }
            return s;
        });
        const updatedPage = { ...currentPage, sections: updatedSections };
        setCurrentPage(updatedPage);

        // Send live update to iframe
        const iframe = document.querySelector('iframe');
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({
                type: 'UPDATE_PAGE_CONFIG',
                payload: updatedPage
            }, '*');
        }
    };

    if (loading && !currentPage) return <div className="flex h-screen items-center justify-center">Loading Editor...</div>;

    return (
        <div className="flex h-screen bg-[#F6F6F6] overflow-hidden font-sans text-gray-800">
            {/* Left Sidebar: Pages & Layers */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
                {/* Header */}
                <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-sm font-bold text-gray-900">Theme Editor</h2>
                        <div className="flex gap-2">
                            <BackupControls />
                            <button onClick={handleSave} className="text-xs bg-black text-white px-3 py-1.5 rounded-md hover:bg-gray-800 transition-colors font-medium">
                                Save
                            </button>
                        </div>
                    </div>

                    {/* Page Selector */}
                    <div className="relative">
                        {isCreatingPage ? (
                            <form onSubmit={handleCreatePage} className="mb-2">
                                <input
                                    autoFocus
                                    placeholder="Page Name"
                                    className="w-full p-2 border rounded text-sm mb-2 focus:ring-1 focus:ring-black focus:border-black outline-none"
                                    value={newPageName}
                                    onChange={e => setNewPageName(e.target.value)}
                                />
                                <div className="flex gap-2">
                                    <Button type="submit" size="sm" className="flex-1 bg-black text-white h-8">Create</Button>
                                    <Button type="button" size="sm" variant="outline" className="flex-1 h-8" onClick={() => setIsCreatingPage(false)}>Cancel</Button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex items-center gap-2">
                                <select
                                    value={selectedPageId}
                                    onChange={(e) => setSelectedPageId(e.target.value)}
                                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium focus:outline-none focus:border-gray-400"
                                >
                                    {pages.map(p => <option key={p.id} value={p.slug}>{p.name}</option>)}
                                </select>
                                <button onClick={() => setIsCreatingPage(true)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-md" title="New Page">
                                    <Plus size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Section List */}
                <div className="flex-1 overflow-y-auto p-2">
                    <div className="mb-2 px-2 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Template
                    </div>

                    {currentPage && (
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={currentPage.sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
                                <div className="space-y-1">
                                    {currentPage.sections.map((section) => (
                                        <SortableItem
                                            key={section.id}
                                            id={section.id}
                                            section={section}
                                            isSelected={selectedSectionId === section.id}
                                            onClick={() => setSelectedSectionId(section.id)}
                                            onRemove={() => removeSection(section.id)}
                                            onToggleVisibility={() => toggleSectionVisibility(section.id)}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    )}

                    {/* Add Section Button */}
                    <div className="mt-4 px-2">
                        <button
                            onClick={() => setShowAddMenu(!showAddMenu)}
                            className="w-full py-2 flex items-center justify-center gap-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-md transition-colors border border-dashed border-blue-200"
                        >
                            <Plus size={14} /> Add Section
                        </button>
                    </div>

                    {/* Add Section Menu */}
                    {showAddMenu && (
                        <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2">
                            <div className="p-2 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500">
                                AVAILABLE SECTIONS
                            </div>
                            <div className="max-h-60 overflow-y-auto">
                                {Object.keys(SECTION_SCHEMAS).map(type => {
                                    const schema = SECTION_SCHEMAS[type];
                                    const Icon = ICON_MAP[schema.icon] || GripHorizontal;
                                    return (
                                        <button
                                            key={type}
                                            onClick={() => addSection(type)}
                                            className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50 last:border-0"
                                        >
                                            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                                                <Icon size={16} />
                                            </div>
                                            <span className="font-medium text-gray-700">{schema.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Center: Preview */}
            <div className="flex-1 flex flex-col relative">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-white rounded-full shadow-sm border border-gray-200 p-1 flex gap-1">
                    <button
                        onClick={() => setPreviewMode('desktop')}
                        className={`p-2 rounded-full transition-all ${previewMode === 'desktop' ? 'bg-gray-100 text-black' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <Monitor size={18} />
                    </button>
                    <button
                        onClick={() => setPreviewMode('mobile')}
                        className={`p-2 rounded-full transition-all ${previewMode === 'mobile' ? 'bg-gray-100 text-black' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <Smartphone size={18} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 flex justify-center bg-[#F0F0F0]">
                    <div
                        className={`bg-white shadow-2xl transition-all duration-500 ease-in-out overflow-hidden ${previewMode === 'mobile'
                            ? 'w-[375px] h-[812px] rounded-[40px] border-[12px] border-gray-900 mt-10'
                            : 'w-full max-w-[1400px] min-h-full rounded-md mt-10'
                            }`}
                    >
                        <iframe
                            src={`/${currentPage?.slug === 'home' ? '' : currentPage?.slug}`}
                            className="w-full h-full border-none bg-white"
                            title="Preview"
                        />
                    </div>
                </div>
            </div>

            {/* Right: Properties */}
            <div className={`w-80 bg-white border-l border-gray-200 overflow-y-auto transition-transform duration-300 ${selectedSectionId ? 'translate-x-0' : 'translate-x-full'} absolute right-0 h-full shadow-xl z-20`}>
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                    <h3 className="font-bold text-sm text-gray-900">
                        {selectedSectionId ? SECTION_SCHEMAS[currentPage?.sections.find(s => s.id === selectedSectionId)?.type || '']?.name : 'Properties'}
                    </h3>
                    <button onClick={() => setSelectedSectionId(null)} className="text-gray-400 hover:text-gray-600">
                        &times;
                    </button>
                </div>

                <div className="p-4">
                    {selectedSectionId && currentPage ? (
                        (() => {
                            const section = currentPage.sections.find(s => s.id === selectedSectionId);
                            if (!section) return null;
                            const schema = SECTION_SCHEMAS[section.type];

                            return (
                                <div className="space-y-6">
                                    {schema.fields.map((field: any) => (
                                        <div key={field.name} className="space-y-1.5">
                                            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">{field.label}</label>

                                            {field.type === 'text' && (
                                                <input
                                                    value={section.content[field.name] || ''}
                                                    onChange={(e) => updateSection(section.id, field.name, e.target.value)}
                                                    className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition-all"
                                                />
                                            )}

                                            {field.type === 'textarea' && (
                                                <textarea
                                                    value={section.content[field.name] || ''}
                                                    onChange={(e) => updateSection(section.id, field.name, e.target.value)}
                                                    className="w-full border border-gray-300 p-2 rounded-md text-sm h-24 focus:ring-1 focus:ring-black focus:border-black outline-none transition-all resize-none"
                                                />
                                            )}

                                            {field.type === 'select' && (
                                                <div className="relative">
                                                    <select
                                                        value={section.content[field.name] || ''}
                                                        onChange={(e) => updateSection(section.id, field.name, e.target.value)}
                                                        className="w-full border border-gray-300 p-2 rounded-md text-sm appearance-none focus:ring-1 focus:ring-black focus:border-black outline-none bg-white"
                                                    >
                                                        <option value="">Select...</option>
                                                        {field.options.map((opt: string) => (
                                                            <option key={opt} value={opt}>{opt}</option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                    </div>
                                                </div>
                                            )}

                                            {field.type === 'image' && (
                                                <div className="space-y-2">
                                                    <div className="flex gap-2">
                                                        <input
                                                            value={section.content[field.name] || ''}
                                                            onChange={(e) => updateSection(section.id, field.name, e.target.value)}
                                                            className="flex-1 border border-gray-300 p-2 rounded-md text-sm focus:ring-1 focus:ring-black focus:border-black outline-none transition-all"
                                                            placeholder="https://..."
                                                        />
                                                        <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-md transition-colors flex items-center justify-center border border-gray-200">
                                                            <ImageIcon size={18} />
                                                            <input
                                                                type="file"
                                                                className="hidden"
                                                                accept="image/*"
                                                                onChange={async (e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (!file) return;

                                                                    const formData = new FormData();
                                                                    formData.append('file', file);

                                                                    try {
                                                                        const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                                                        const data = await res.json();
                                                                        if (data.success) {
                                                                            updateSection(section.id, field.name, data.path);
                                                                        } else {
                                                                            alert('Upload failed');
                                                                        }
                                                                    } catch (err) {
                                                                        console.error(err);
                                                                        alert('Upload error');
                                                                    }
                                                                }}
                                                            />
                                                        </label>
                                                    </div>
                                                    {section.content[field.name] && (
                                                        <div className="relative w-full h-32 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                                                            <img src={section.content[field.name]} alt="Preview" className="w-full h-full object-cover" />
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {field.type === 'typography' && (
                                                <div className="p-3 bg-gray-50 border border-gray-200 rounded-md space-y-3">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div>
                                                            <label className="block text-[10px] font-bold text-gray-500 mb-1">Size</label>
                                                            <select
                                                                value={section.content[field.name]?.size || 'text-base'}
                                                                onChange={(e) => updateSection(section.id, field.name, { ...section.content[field.name], size: e.target.value })}
                                                                className="w-full border border-gray-300 p-1.5 rounded text-xs bg-white"
                                                            >
                                                                <option value="text-xs">XS</option>
                                                                <option value="text-sm">Small</option>
                                                                <option value="text-base">Base</option>
                                                                <option value="text-lg">Large</option>
                                                                <option value="text-xl">XL</option>
                                                                <option value="text-2xl">2XL</option>
                                                                <option value="text-3xl">3XL</option>
                                                                <option value="text-4xl">4XL</option>
                                                                <option value="text-5xl">5XL</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] font-bold text-gray-500 mb-1">Weight</label>
                                                            <select
                                                                value={section.content[field.name]?.weight || 'font-normal'}
                                                                onChange={(e) => updateSection(section.id, field.name, { ...section.content[field.name], weight: e.target.value })}
                                                                className="w-full border border-gray-300 p-1.5 rounded text-xs bg-white"
                                                            >
                                                                <option value="font-light">Light</option>
                                                                <option value="font-normal">Normal</option>
                                                                <option value="font-medium">Medium</option>
                                                                <option value="font-semibold">Semibold</option>
                                                                <option value="font-bold">Bold</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div>
                                                            <label className="block text-[10px] font-bold text-gray-500 mb-1">Align</label>
                                                            <select
                                                                value={section.content[field.name]?.align || 'text-left'}
                                                                onChange={(e) => updateSection(section.id, field.name, { ...section.content[field.name], align: e.target.value })}
                                                                className="w-full border border-gray-300 p-1.5 rounded text-xs bg-white"
                                                            >
                                                                <option value="text-left">Left</option>
                                                                <option value="text-center">Center</option>
                                                                <option value="text-right">Right</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] font-bold text-gray-500 mb-1">Color</label>
                                                            <input
                                                                type="color"
                                                                value={section.content[field.name]?.color || '#000000'}
                                                                onChange={(e) => updateSection(section.id, field.name, { ...section.content[field.name], color: e.target.value })}
                                                                className="w-full h-8 p-0 border-0 rounded cursor-pointer"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {field.type === 'array' && (
                                                <div className="space-y-3">
                                                    {(section.content[field.name] || []).map((item: any, index: number) => (
                                                        <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50 relative group hover:border-gray-300 transition-colors">
                                                            <button
                                                                onClick={() => {
                                                                    const newArray = [...(section.content[field.name] || [])];
                                                                    newArray.splice(index, 1);
                                                                    updateSection(section.id, field.name, newArray);
                                                                }}
                                                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                            <div className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Slide {index + 1}</div>

                                                            <div className="space-y-3">
                                                                {field.itemSchema.fields.map((subField: any) => (
                                                                    <div key={subField.name}>
                                                                        <label className="block text-[10px] font-bold mb-1 text-gray-500">{subField.label}</label>
                                                                        {subField.type === 'text' && (
                                                                            <input
                                                                                value={item[subField.name] || ''}
                                                                                onChange={(e) => {
                                                                                    const newArray = [...(section.content[field.name] || [])];
                                                                                    newArray[index] = { ...newArray[index], [subField.name]: e.target.value };
                                                                                    updateSection(section.id, field.name, newArray);
                                                                                }}
                                                                                className="w-full border border-gray-300 p-1.5 rounded text-xs focus:border-black outline-none"
                                                                            />
                                                                        )}
                                                                        {subField.type === 'select' && (
                                                                            <select
                                                                                value={item[subField.name] || ''}
                                                                                onChange={(e) => {
                                                                                    const newArray = [...(section.content[field.name] || [])];
                                                                                    newArray[index] = { ...newArray[index], [subField.name]: e.target.value };
                                                                                    updateSection(section.id, field.name, newArray);
                                                                                }}
                                                                                className="w-full border border-gray-300 p-1.5 rounded text-xs focus:border-black outline-none"
                                                                            >
                                                                                {subField.options.map((opt: string) => (
                                                                                    <option key={opt} value={opt}>{opt}</option>
                                                                                ))}
                                                                            </select>
                                                                        )}
                                                                        {subField.type === 'image' && (
                                                                            <div className="space-y-2">
                                                                                <div className="flex gap-2">
                                                                                    <input
                                                                                        value={item[subField.name] || ''}
                                                                                        onChange={(e) => {
                                                                                            const newArray = [...(section.content[field.name] || [])];
                                                                                            newArray[index] = { ...newArray[index], [subField.name]: e.target.value };
                                                                                            updateSection(section.id, field.name, newArray);
                                                                                        }}
                                                                                        className="flex-1 border border-gray-300 p-1.5 rounded text-xs focus:border-black outline-none"
                                                                                        placeholder="https://..."
                                                                                    />
                                                                                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600 p-1.5 rounded transition-colors flex items-center justify-center border border-gray-200">
                                                                                        <ImageIcon size={14} />
                                                                                        <input
                                                                                            type="file"
                                                                                            className="hidden"
                                                                                            accept="image/*"
                                                                                            onChange={async (e) => {
                                                                                                const file = e.target.files?.[0];
                                                                                                if (!file) return;

                                                                                                const formData = new FormData();
                                                                                                formData.append('file', file);

                                                                                                try {
                                                                                                    const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                                                                                    const data = await res.json();
                                                                                                    if (data.success) {
                                                                                                        const newArray = [...(section.content[field.name] || [])];
                                                                                                        newArray[index] = { ...newArray[index], [subField.name]: data.path };
                                                                                                        updateSection(section.id, field.name, newArray);
                                                                                                    } else {
                                                                                                        alert('Upload failed');
                                                                                                    }
                                                                                                } catch (err) {
                                                                                                    console.error(err);
                                                                                                    alert('Upload error');
                                                                                                }
                                                                                            }}
                                                                                        />
                                                                                    </label>
                                                                                </div>
                                                                                {item[subField.name] && (
                                                                                    <div className="relative w-full h-20 bg-gray-100 rounded overflow-hidden border border-gray-200">
                                                                                        <img src={item[subField.name]} alt="Preview" className="w-full h-full object-cover" />
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                        {subField.type === 'typography' && (
                                                                            <div className="p-2 bg-white border border-gray-200 rounded space-y-2">
                                                                                <div className="grid grid-cols-2 gap-2">
                                                                                    <select
                                                                                        value={item[subField.name]?.size || 'text-base'}
                                                                                        onChange={(e) => {
                                                                                            const newArray = [...(section.content[field.name] || [])];
                                                                                            newArray[index] = {
                                                                                                ...newArray[index],
                                                                                                [subField.name]: { ...item[subField.name], size: e.target.value }
                                                                                            };
                                                                                            updateSection(section.id, field.name, newArray);
                                                                                        }}
                                                                                        className="w-full border border-gray-300 p-1 rounded text-[10px]"
                                                                                    >
                                                                                        <option value="text-xs">XS</option>
                                                                                        <option value="text-sm">Small</option>
                                                                                        <option value="text-base">Base</option>
                                                                                        <option value="text-lg">Large</option>
                                                                                        <option value="text-xl">XL</option>
                                                                                        <option value="text-2xl">2XL</option>
                                                                                        <option value="text-3xl">3XL</option>
                                                                                        <option value="text-4xl">4XL</option>
                                                                                        <option value="text-5xl">5XL</option>
                                                                                    </select>
                                                                                    <select
                                                                                        value={item[subField.name]?.weight || 'font-normal'}
                                                                                        onChange={(e) => {
                                                                                            const newArray = [...(section.content[field.name] || [])];
                                                                                            newArray[index] = {
                                                                                                ...newArray[index],
                                                                                                [subField.name]: { ...item[subField.name], weight: e.target.value }
                                                                                            };
                                                                                            updateSection(section.id, field.name, newArray);
                                                                                        }}
                                                                                        className="w-full border border-gray-300 p-1 rounded text-[10px]"
                                                                                    >
                                                                                        <option value="font-light">Light</option>
                                                                                        <option value="font-normal">Normal</option>
                                                                                        <option value="font-medium">Medium</option>
                                                                                        <option value="font-semibold">Semibold</option>
                                                                                        <option value="font-bold">Bold</option>
                                                                                    </select>
                                                                                </div>
                                                                                <div className="grid grid-cols-2 gap-2">
                                                                                    <select
                                                                                        value={item[subField.name]?.align || 'text-left'}
                                                                                        onChange={(e) => {
                                                                                            const newArray = [...(section.content[field.name] || [])];
                                                                                            newArray[index] = {
                                                                                                ...newArray[index],
                                                                                                [subField.name]: { ...item[subField.name], align: e.target.value }
                                                                                            };
                                                                                            updateSection(section.id, field.name, newArray);
                                                                                        }}
                                                                                        className="w-full border border-gray-300 p-1 rounded text-[10px]"
                                                                                    >
                                                                                        <option value="text-left">Left</option>
                                                                                        <option value="text-center">Center</option>
                                                                                        <option value="text-right">Right</option>
                                                                                    </select>
                                                                                    <input
                                                                                        type="color"
                                                                                        value={item[subField.name]?.color || '#000000'}
                                                                                        onChange={(e) => {
                                                                                            const newArray = [...(section.content[field.name] || [])];
                                                                                            newArray[index] = {
                                                                                                ...newArray[index],
                                                                                                [subField.name]: { ...item[subField.name], color: e.target.value }
                                                                                            };
                                                                                            updateSection(section.id, field.name, newArray);
                                                                                        }}
                                                                                        className="w-full h-6 p-0 border-0 rounded cursor-pointer"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="w-full text-xs border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-600"
                                                        onClick={() => {
                                                            const newArray = [...(section.content[field.name] || [])];
                                                            newArray.push({});
                                                            updateSection(section.id, field.name, newArray);
                                                        }}
                                                    >
                                                        + Add Slide
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    <div className="pt-6 border-t border-gray-200 mt-8">
                                        <h4 className="font-bold text-xs mb-4 text-gray-900 uppercase">Layout Settings</h4>
                                        <div className="mb-4">
                                            <label className="block text-xs font-semibold text-gray-600 mb-1">Top Padding</label>
                                            <select
                                                value={section.settings?.paddingTop || 'medium'}
                                                onChange={(e) => updateSectionSettings(section.id, 'paddingTop', e.target.value)}
                                                className="w-full border border-gray-300 p-2 rounded-md text-sm bg-white"
                                            >
                                                <option value="none">None</option>
                                                <option value="small">Small</option>
                                                <option value="medium">Medium</option>
                                                <option value="large">Large</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-xs font-semibold text-gray-600 mb-1">Bottom Padding</label>
                                            <select
                                                value={section.settings?.paddingBottom || 'medium'}
                                                onChange={(e) => updateSectionSettings(section.id, 'paddingBottom', e.target.value)}
                                                className="w-full border border-gray-300 p-2 rounded-md text-sm bg-white"
                                            >
                                                <option value="none">None</option>
                                                <option value="small">Small</option>
                                                <option value="medium">Medium</option>
                                                <option value="large">Large</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()
                    ) : (
                        <div className="text-sm text-gray-500 text-center mt-10">
                            Select a section to edit
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function SortableItem(props: any) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const schema = SECTION_SCHEMAS[props.section.type];
    const Icon = ICON_MAP[schema?.icon] || GripHorizontal;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`
                flex items-center gap-3 p-3 rounded-md cursor-pointer group transition-all
                ${props.isSelected
                    ? 'bg-gray-100 border border-gray-300 shadow-sm'
                    : 'bg-white border border-transparent hover:bg-gray-50 hover:border-gray-200'}
            `}
            onClick={props.onClick}
        >
            <div className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600" {...attributes} {...listeners}>
                <GripVertical size={16} />
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                <Icon size={16} />
            </div>
            <span className={`text-sm font-medium flex-1 ${props.section.hidden ? 'text-gray-400 italic line-through' : 'text-gray-700'}`}>
                {schema?.name || props.section.type}
            </span>

            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        props.onToggleVisibility();
                    }}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded"
                    title={props.section.hidden ? "Show Section" : "Hide Section"}
                >
                    {props.section.hidden ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" /></svg>
                    ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    )}
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        props.onRemove();
                    }}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
                    title="Remove Section"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    );
}

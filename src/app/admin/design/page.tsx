'use client';

import { useState, useEffect } from 'react';
import { PageConfig, Section } from '@/lib/db';
import { SECTION_SCHEMAS } from '@/components/sections/registry';
import { Button } from '@/components/ui/Button';
import {
    Plus, Trash2, GripVertical, Save, Monitor, Smartphone,
    GalleryHorizontal, Image as ImageIcon, LayoutGrid, Type,
    Info, Heart, MessageSquareQuote, GripHorizontal, X,
    Download, Upload, Layout
} from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { createPage, fetchAllPages, fetchPageConfig, updatePageConfig } from '@/app/actions/design-actions';
import { exportData, importData } from '@/app/actions/backup-actions';
import { UNIVERSAL_STYLE_SCHEMA } from '@/lib/lethal-schema';
import { LethalFieldRenderer } from '@/components/admin/LethalFieldRenderer';

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
    const [activeTab, setActiveTab] = useState<'content' | 'style'>('content');
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

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'SELECT_SECTION') {
                setSelectedSectionId(event.data.payload.id);
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

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
            {/* Right: Properties */}
            <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto absolute right-0 h-full shadow-xl z-20">
                {selectedSectionId && currentPage ? (() => {
                    const section = currentPage.sections.find(s => s.id === selectedSectionId);
                    if (!section) return null;
                    const schema = SECTION_SCHEMAS[section.type];

                    return (
                        <div className="flex flex-col h-full">
                            <div className="p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-sm text-gray-900">
                                        {schema?.name || 'Properties'}
                                    </h3>
                                    <button onClick={() => setSelectedSectionId(null)} className="text-gray-400 hover:text-gray-600">
                                        <X size={16} />
                                    </button>
                                </div>

                                {/* Tabs */}
                                <div className="flex p-1 bg-gray-100 rounded-lg">
                                    <button
                                        onClick={() => setActiveTab('content')}
                                        className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'content' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Content
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('style')}
                                        className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'style' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Style
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                                {activeTab === 'content' ? (
                                    /* Content Tab */
                                    <div className="space-y-4">
                                        {schema?.fields.map((field: any) => (
                                            <LethalFieldRenderer
                                                key={field.name}
                                                field={field}
                                                value={section.content[field.name]}
                                                onChange={(value) => updateSection(section.id, field.name, value)}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    /* Style Tab */
                                    <div className="space-y-6">
                                        {(schema.styles || UNIVERSAL_STYLE_SCHEMA).map((category: any) => (
                                            <div key={category.group} className="space-y-3">
                                                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
                                                    {category.group}
                                                </h4>
                                                <div className="space-y-4">
                                                    {category.fields.map((field: any) => (
                                                        <LethalFieldRenderer
                                                            key={field.name}
                                                            field={field}
                                                            value={section.settings?.[field.name]}
                                                            onChange={(value) => updateSectionSettings(section.id, field.name, value)}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })() : (
                    <div className="flex flex-col h-full">
                        <div className="p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <Layout size={16} className="text-gray-400" />
                                <h3 className="font-bold text-sm text-gray-900">Global Design System</h3>
                            </div>
                            <p className="text-xs text-gray-500">Browsing all available customization options.</p>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            {UNIVERSAL_STYLE_SCHEMA.map((category: any) => (
                                <div key={category.group} className="space-y-3">
                                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
                                        {category.group}
                                    </h4>
                                    <div className="space-y-4">
                                        {category.fields.map((field: any) => (
                                            <LethalFieldRenderer
                                                key={field.name}
                                                field={field}
                                                value={null} // Read-only / Demo mode
                                                onChange={(value) => console.log(`Global setting ${field.name} changed to:`, value)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}

function SortableItem({ id, section, isSelected, onClick, onRemove, onToggleVisibility }: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const schema = SECTION_SCHEMAS[section.type];
    const Icon = ICON_MAP[schema?.icon] || GripHorizontal;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group relative flex items-center gap-3 p-3 bg-white border rounded-md cursor-pointer transition-all ${isSelected ? 'border-black ring-1 ring-black shadow-sm' : 'border-gray-200 hover:border-gray-300'
                } ${section.hidden ? 'opacity-50' : ''}`}
            onClick={onClick}
        >
            <div {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-gray-600">
                <GripVertical size={16} />
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                <Icon size={16} />
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">{schema?.name || section.type}</div>
                <div className="text-xs text-gray-500 truncate">
                    {section.content.title || section.content.heading || 'Untitled Section'}
                </div>
            </div>
            <div className="flex items-center gap-1">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleVisibility();
                    }}
                    className="p-1.5 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100"
                    title={section.hidden ? "Show" : "Hide"}
                >
                    {section.hidden ? <ImageIcon size={14} className="opacity-50" /> : <Monitor size={14} />}
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    className="p-1.5 text-gray-400 hover:text-red-500 rounded hover:bg-red-50"
                    title="Remove"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    );
}

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface LethalFieldRendererProps {
    field: {
        type: string;
        label: string;
        options?: string[];
        min?: number;
        max?: number;
        step?: number;
        [key: string]: any;
    };
    value: any;
    onChange: (value: any) => void;
}

export const LethalFieldRenderer = ({ field, value, onChange }: LethalFieldRendererProps) => {

    if (field.type === 'color') {
        return (
            <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">{field.label}</label>
                <div className="flex gap-2 items-center">
                    <div className="w-8 h-8 rounded border border-gray-200 overflow-hidden relative">
                        <input
                            type="color"
                            value={value || '#000000'}
                            onChange={(e) => onChange(e.target.value)}
                            className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer p-0 border-0"
                        />
                    </div>
                    <input
                        type="text"
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="#000000"
                        className="flex-1 border border-gray-300 p-1.5 rounded text-xs font-mono uppercase focus:border-black outline-none"
                    />
                </div>
            </div>
        );
    }

    if (field.type === 'select') {
        return (
            <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">{field.label}</label>
                <select
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full border border-gray-300 p-1.5 rounded text-xs bg-white focus:border-black outline-none"
                >
                    <option value="">Default</option>
                    {field.options?.map((opt: any) => {
                        const isObject = typeof opt === 'object' && opt !== null;
                        const label = isObject ? opt.label : opt;
                        const val = isObject ? opt.value : opt;
                        return <option key={val} value={val}>{label}</option>;
                    })}
                </select>
            </div>
        );
    }

    if (field.type === 'number') {
        return (
            <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">{field.label}</label>
                <input
                    type="number"
                    value={value || ''}
                    onChange={(e) => onChange(Number(e.target.value))}
                    step={field.step || 1}
                    className="w-full border border-gray-300 p-1.5 rounded text-xs focus:border-black outline-none"
                />
            </div>
        );
    }

    if (field.type === 'slider') {
        return (
            <div className="space-y-1">
                <div className="flex justify-between">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">{field.label}</label>
                    <span className="text-[10px] text-gray-400">{value || 0}</span>
                </div>
                <input
                    type="range"
                    min={field.min}
                    max={field.max}
                    step={field.step || 1}
                    value={value || 0}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
            </div>
        );
    }

    if (field.type === 'spacing') {
        const spacing = value || { top: '0px', right: '0px', bottom: '0px', left: '0px' };
        const handleChange = (key: string, val: string) => {
            onChange({ ...spacing, [key]: val });
        };

        return (
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase">{field.label}</label>
                <div className="grid grid-cols-2 gap-2">
                    {['top', 'right', 'bottom', 'left'].map((side) => (
                        <div key={side} className="relative">
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] text-gray-400 uppercase">{side[0]}</span>
                            <input
                                type="text"
                                value={spacing[side] || ''}
                                onChange={(e) => handleChange(side, e.target.value)}
                                placeholder="0px"
                                className="w-full border border-gray-300 p-1.5 pl-5 rounded text-xs focus:border-black outline-none"
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (field.type === 'border') {
        const border = value || { width: 0, style: 'solid', color: '#000000', radius: { tl: 0, tr: 0, br: 0, bl: 0 } };
        return (
            <div className="space-y-3 p-3 bg-gray-50 rounded border border-gray-200">
                <label className="text-[10px] font-bold text-gray-500 uppercase block border-b border-gray-200 pb-1 mb-2">{field.label}</label>

                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="text-[9px] text-gray-400 block mb-1">Width</label>
                        <input
                            type="number"
                            value={border.width}
                            onChange={(e) => onChange({ ...border, width: Number(e.target.value) })}
                            className="w-full border border-gray-300 p-1 rounded text-xs"
                        />
                    </div>
                    <div>
                        <label className="text-[9px] text-gray-400 block mb-1">Style</label>
                        <select
                            value={border.style}
                            onChange={(e) => onChange({ ...border, style: e.target.value })}
                            className="w-full border border-gray-300 p-1 rounded text-xs bg-white"
                        >
                            <option value="solid">Solid</option>
                            <option value="dashed">Dashed</option>
                            <option value="dotted">Dotted</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="text-[9px] text-gray-400 block mb-1">Color</label>
                    <div className="flex gap-2">
                        <input
                            type="color"
                            value={border.color}
                            onChange={(e) => onChange({ ...border, color: e.target.value })}
                            className="w-8 h-6 p-0 border-0 rounded"
                        />
                        <input
                            type="text"
                            value={border.color}
                            onChange={(e) => onChange({ ...border, color: e.target.value })}
                            className="flex-1 border border-gray-300 p-1 rounded text-xs"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-[9px] text-gray-400 block mb-1">Radius (TL-TR-BR-BL)</label>
                    <div className="grid grid-cols-4 gap-1">
                        {['tl', 'tr', 'br', 'bl'].map((corner) => (
                            <input
                                key={corner}
                                type="number"
                                value={border.radius?.[corner] || 0}
                                onChange={(e) => onChange({
                                    ...border,
                                    radius: { ...border.radius, [corner]: Number(e.target.value) }
                                })}
                                className="w-full border border-gray-300 p-1 rounded text-xs text-center"
                                placeholder="0"
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (field.type === 'shadow') {
        const shadows = value || [];
        const addShadow = () => {
            onChange([...shadows, { x: 0, y: 4, blur: 10, spread: 0, color: 'rgba(0,0,0,0.1)', inset: false }]);
        };
        const removeShadow = (index: number) => {
            const newShadows = [...shadows];
            newShadows.splice(index, 1);
            onChange(newShadows);
        };
        const updateShadow = (index: number, key: string, val: any) => {
            const newShadows = [...shadows];
            newShadows[index] = { ...newShadows[index], [key]: val };
            onChange(newShadows);
        };

        return (
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">{field.label}</label>
                    <button onClick={addShadow} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        <Plus size={12} /> Add
                    </button>
                </div>

                {shadows.map((shadow: any, index: number) => (
                    <div key={index} className="p-2 bg-gray-50 border border-gray-200 rounded space-y-2 relative group">
                        <button onClick={() => removeShadow(index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100">
                            <Trash2 size={12} />
                        </button>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="text-[9px] text-gray-400">X</label>
                                <input type="number" value={shadow.x} onChange={(e) => updateShadow(index, 'x', Number(e.target.value))} className="w-full border border-gray-300 p-1 rounded text-xs" />
                            </div>
                            <div>
                                <label className="text-[9px] text-gray-400">Y</label>
                                <input type="number" value={shadow.y} onChange={(e) => updateShadow(index, 'y', Number(e.target.value))} className="w-full border border-gray-300 p-1 rounded text-xs" />
                            </div>
                            <div>
                                <label className="text-[9px] text-gray-400">Blur</label>
                                <input type="number" value={shadow.blur} onChange={(e) => updateShadow(index, 'blur', Number(e.target.value))} className="w-full border border-gray-300 p-1 rounded text-xs" />
                            </div>
                            <div>
                                <label className="text-[9px] text-gray-400">Spread</label>
                                <input type="number" value={shadow.spread} onChange={(e) => updateShadow(index, 'spread', Number(e.target.value))} className="w-full border border-gray-300 p-1 rounded text-xs" />
                            </div>
                        </div>
                        <div>
                            <label className="text-[9px] text-gray-400">Color</label>
                            <div className="flex gap-2">
                                <input type="color" value={shadow.color} onChange={(e) => updateShadow(index, 'color', e.target.value)} className="w-6 h-6 p-0 border-0 rounded" />
                                <input type="text" value={shadow.color} onChange={(e) => updateShadow(index, 'color', e.target.value)} className="flex-1 border border-gray-300 p-1 rounded text-xs" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (field.type === 'text') {
        return (
            <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">{field.label}</label>
                <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full border border-gray-300 p-1.5 rounded text-xs focus:border-black outline-none"
                />
            </div>
        );
    }

    if (field.type === 'textarea') {
        return (
            <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">{field.label}</label>
                <textarea
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 p-1.5 rounded text-xs focus:border-black outline-none resize-y"
                />
            </div>
        );
    }

    if (field.type === 'image') {
        const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('file', file);

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });
                const data = await res.json();
                if (data.success) {
                    onChange(data.url);
                } else {
                    alert('Upload failed');
                }
            } catch (err) {
                console.error(err);
                alert('Upload error');
            }
        };

        return (
            <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">{field.label}</label>
                <div className="flex gap-2 items-center">
                    <input
                        type="text"
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="https://..."
                        className="flex-1 border border-gray-300 p-1.5 rounded text-xs focus:border-black outline-none"
                    />
                    <label className="cursor-pointer bg-black text-white p-1.5 rounded text-xs hover:bg-gray-800">
                        <input type="file" className="hidden" onChange={handleUpload} accept="image/*,video/*" />
                        Upload
                    </label>
                </div>
                {value && (
                    <div className="mt-2 relative aspect-video bg-gray-100 rounded overflow-hidden border border-gray-200">
                        {value.match(/\.(mp4|webm)$/i) ? (
                            <video src={value} className="w-full h-full object-cover" muted loop autoPlay playsInline />
                        ) : (
                            <img src={value} alt="Preview" className="w-full h-full object-cover" />
                        )}
                    </div>
                )}
            </div>
        );
    }

    if (field.type === 'array') {
        const items = Array.isArray(value) ? value : [];

        const addItem = () => {
            // Create a default item based on itemSchema
            const newItem: any = {};
            if (field.itemSchema?.fields) {
                field.itemSchema.fields.forEach((f: any) => {
                    newItem[f.name] = ''; // Default empty string, can be improved
                });
            }
            onChange([...items, newItem]);
        };

        const removeItem = (index: number) => {
            const newItems = [...items];
            newItems.splice(index, 1);
            onChange(newItems);
        };

        const updateItem = (index: number, key: string, val: any) => {
            const newItems = [...items];
            newItems[index] = { ...newItems[index], [key]: val };
            onChange(newItems);
        };

        return (
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">{field.label}</label>
                    <button onClick={addItem} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        <Plus size={12} /> Add Item
                    </button>
                </div>

                <div className="space-y-2">
                    {items.map((item: any, index: number) => (
                        <div key={index} className="p-3 bg-gray-50 border border-gray-200 rounded relative group">
                            <button onClick={() => removeItem(index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 z-10">
                                <Trash2 size={12} />
                            </button>
                            <div className="space-y-3">
                                {field.itemSchema?.fields.map((subField: any) => (
                                    <LethalFieldRenderer
                                        key={subField.name}
                                        field={subField}
                                        value={item[subField.name]}
                                        onChange={(val) => updateItem(index, subField.name, val)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (field.type === 'typography') {
        const typo = value || {};
        const updateTypo = (key: string, val: any) => onChange({ ...typo, [key]: val });

        return (
            <div className="space-y-2 p-2 bg-gray-50 rounded border border-gray-200">
                <label className="text-[10px] font-bold text-gray-500 uppercase">{field.label}</label>
                <div className="grid grid-cols-2 gap-2">
                    <select
                        value={typo.size || ''}
                        onChange={(e) => updateTypo('size', e.target.value)}
                        className="border border-gray-300 p-1 rounded text-xs"
                    >
                        <option value="">Size</option>
                        <option value="text-sm">Small</option>
                        <option value="text-base">Base</option>
                        <option value="text-lg">Large</option>
                        <option value="text-xl">XL</option>
                        <option value="text-2xl">2XL</option>
                        <option value="text-4xl">4XL</option>
                    </select>
                    <select
                        value={typo.weight || ''}
                        onChange={(e) => updateTypo('weight', e.target.value)}
                        className="border border-gray-300 p-1 rounded text-xs"
                    >
                        <option value="">Weight</option>
                        <option value="font-light">Light</option>
                        <option value="font-normal">Normal</option>
                        <option value="font-medium">Medium</option>
                        <option value="font-bold">Bold</option>
                    </select>
                    <select
                        value={typo.align || ''}
                        onChange={(e) => updateTypo('align', e.target.value)}
                        className="border border-gray-300 p-1 rounded text-xs"
                    >
                        <option value="">Align</option>
                        <option value="text-left">Left</option>
                        <option value="text-center">Center</option>
                        <option value="text-right">Right</option>
                    </select>
                    <input
                        type="color"
                        value={typo.color || '#000000'}
                        onChange={(e) => updateTypo('color', e.target.value)}
                        className="w-full h-[26px] p-0 border-0 rounded"
                    />
                </div>
            </div>
        );
    }

    return null;
};

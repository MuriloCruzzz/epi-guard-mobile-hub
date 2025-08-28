import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
    value?: string;
    onChange: (dataUrl: string | undefined) => void;
    label?: string;
}

const CANVAS_SIZE = 300;

const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange, label = 'Foto do usuário' }) => {
    const [open, setOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const [startPan, setStartPan] = useState<{ x: number; y: number } | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setImageSrc(value);
    }, [value]);

    const onFileSelected = (file?: File) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result as string);
            setScale(1);
            setOffset({ x: 0, y: 0 });
            setOpen(true);
            // limpa o input para permitir selecionar o mesmo arquivo novamente depois
            if (fileInputRef.current) fileInputRef.current.value = '';
        };
        reader.readAsDataURL(file);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsPanning(true);
        setStartPan({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isPanning || !startPan) return;
        setOffset({ x: e.clientX - startPan.x, y: e.clientY - startPan.y });
    };

    const handleMouseUp = () => {
        setIsPanning(false);
        setStartPan(null);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        setIsPanning(true);
        setStartPan({ x: touch.clientX - offset.x, y: touch.clientY - offset.y });
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isPanning || !startPan) return;
        const touch = e.touches[0];
        setOffset({ x: touch.clientX - startPan.x, y: touch.clientY - startPan.y });
    };

    const handleTouchEnd = () => {
        setIsPanning(false);
        setStartPan(null);
    };

    const exportCropped = () => {
        if (!imageSrc) return;
        const canvas = document.createElement('canvas');
        canvas.width = CANVAS_SIZE;
        canvas.height = CANVAS_SIZE;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = imgRef.current;
        if (!img) return;

        const imgW = img.naturalWidth;
        const imgH = img.naturalHeight;

        // Calcula o tamanho desenhado considerando o scale
        const drawW = imgW * scale;
        const drawH = imgH * scale;

        // Centro do canvas
        const cx = CANVAS_SIZE / 2;
        const cy = CANVAS_SIZE / 2;

        // Posição do topo-esquerda do desenho considerando o offset relativo ao centro
        const dx = cx - drawW / 2 + offset.x;
        const dy = cy - drawH / 2 + offset.y;

        // Fundo branco
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        ctx.drawImage(img, dx, dy, drawW, drawH);

        const dataUrl = canvas.toDataURL('image/png');
        onChange(dataUrl);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
        // garante que próxima seleção do mesmo arquivo dispare onChange
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div>
            <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    {value ? (
                        <img src={value} alt={label} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-xs text-gray-500">Sem foto</span>
                    )}
                </div>
                <div className="flex gap-2">
                    <label className="bg-white border border-primary text-primary px-3 py-2 rounded-md text-sm cursor-pointer hover:bg-primary/5">
                        Selecionar imagem
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => onFileSelected(e.target.files?.[0])}
                        />
                    </label>
                    {value && (
                        <button
                            type="button"
                            className="px-3 py-2 rounded-md text-sm bg-destructive text-white"
                            onClick={() => onChange(undefined)}
                        >
                            Remover
                        </button>
                    )}
                </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[420px]">
                    <DialogHeader>
                        <DialogTitle>Enquadrar imagem</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
                        <div
                            ref={containerRef}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            className="relative mx-auto w-[300px] h-[300px] bg-gray-100 rounded-md overflow-hidden select-none"
                        >
                            {imageSrc && (
                                <img
                                    ref={imgRef}
                                    src={imageSrc}
                                    alt="preview"
                                    draggable={false}
                                    style={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: '50%',
                                        transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                                        transformOrigin: 'center center'
                                    }}
                                />
                            )}
                            <div className="pointer-events-none absolute inset-0 ring-2 ring-primary/60"></div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-600">Zoom</span>
                            <input
                                type="range"
                                min={0.5}
                                max={3}
                                step={0.01}
                                value={scale}
                                onChange={(e) => setScale(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex gap-2">
                        <button type="button" className="px-3 py-2 rounded-md text-sm" onClick={handleCancel}>Cancelar</button>
                        <button type="button" className="px-3 py-2 rounded-md text-sm bg-primary text-white" onClick={exportCropped}>Confirmar</button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ImageUploader;

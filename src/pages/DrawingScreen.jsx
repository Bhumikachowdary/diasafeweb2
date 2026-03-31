import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Trash2, Undo, Redo, Plus, Minus, Search, MousePointer2 } from 'lucide-react';

const DrawingScreen = () => {
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#2563EB');
    const [brushSize, setBrushSize] = useState(3);
    const [elements, setElements] = useState([]);
    const [redoStack, setRedoStack] = useState([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Setup canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight - 200; // Subtract header/footer
            redraw();
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    const redraw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        ctx.strokeStyle = '#F1F5F9';
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 30) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 30) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }
        
        // Draw lines
        elements.forEach(line => {
            ctx.strokeStyle = line.color;
            ctx.lineWidth = line.width;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.beginPath();
            ctx.moveTo(line.points[0].x, line.points[0].y);
            for (let i = 1; i < line.points.length; i++) {
                ctx.lineTo(line.points[i].x, line.points[i].y);
            }
            ctx.stroke();
        });
    };

    const handleMouseDown = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setIsDrawing(true);
        setElements([...elements, { points: [{ x, y }], color, width: brushSize }]);
        setRedoStack([]);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const lastElement = elements[elements.length - 1];
        lastElement.points.push({ x, y });
        setElements([...elements.slice(0, -1), lastElement]);
        redraw();
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    const handleSave = () => {
        // In a real app, convert canvas to SMILES or Image
        // For now, just go back with a fake result
        navigate('/analysis', { state: { drawResult: 'C1=CC=CC=C1' } });
    };

    const handleClear = () => {
        setElements([]);
        setRedoStack([]);
        redraw();
    };

    const handleUndo = () => {
        if (elements.length === 0) return;
        const last = elements[elements.length - 1];
        setRedoStack([...redoStack, last]);
        setElements(elements.slice(0, -1));
        setTimeout(redraw, 0);
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
            {/* Header */}
            <div style={{ 
                padding: '24px 20px', 
                background: 'linear-gradient(90deg, #2563EB 0%, #0D9488 100%)', 
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><ArrowLeft /></button>
                    <div>
                        <h1 style={{ fontSize: 18, fontWeight: 'bold', margin: 0 }}>Chemical Editor</h1>
                        <span style={{ fontSize: 11, opacity: 0.8 }}>Draw structure for analysis</span>
                    </div>
                </div>
                <button 
                  onClick={handleSave}
                  style={{ 
                    backgroundColor: 'white', 
                    color: '#2563EB', 
                    border: 'none', 
                    borderRadius: 10, 
                    padding: '8px 16px', 
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                }}>
                    <Save size={18} />
                    Process
                </button>
            </div>

            {/* Toolbar */}
            <div style={{ 
                padding: '12px 20px', 
                borderBottom: '1px solid #F1F5F9', 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#F8FAFC'
            }}>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={handleUndo} className="tool-btn"><Undo size={20} /></button>
                    <button onClick={handleClear} className="tool-btn"><Trash2 size={20} /></button>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    {['#2563EB', '#0D9488', '#EF4444', '#1E293B'].map(c => (
                        <div 
                          key={c} 
                          onClick={() => setColor(c)}
                          style={{ 
                            width: 24, 
                            height: 24, 
                            borderRadius: '50%', 
                            backgroundColor: c, 
                            border: color === c ? '2px solid #CBD5E1' : 'none',
                            cursor: 'pointer'
                        }}></div>
                    ))}
                </div>
            </div>

            {/* Canvas */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden', cursor: 'crosshair' }}>
                <canvas 
                    ref={canvasRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={(e) => {
                        const touch = e.touches[0];
                        handleMouseDown({ clientX: touch.clientX, clientY: touch.clientY });
                    }}
                    onTouchMove={(e) => {
                        const touch = e.touches[0];
                        handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
                    }}
                    onTouchEnd={handleMouseUp}
                />
            </div>

            {/* Footer Tools */}
            <div style={{ 
                padding: '16px 20px', 
                borderTop: '1px solid #F1F5F9', 
                display: 'flex', 
                justifyContent: 'space-around',
                backgroundColor: '#F8FAFC'
            }}>
                <button className="tool-btn-circle"><Plus /></button>
                <button className="tool-btn-circle" style={{ backgroundColor: '#2563EB', color: 'white' }}><MousePointer2 /></button>
                <button className="tool-btn-circle"><Minus /></button>
                <button className="tool-btn-circle"><Search /></button>
            </div>

            <style>{`
                .tool-btn {
                    padding: 8px;
                    border-radius: 8px;
                    border: 1px solid #E2E8F0;
                    background-color: white;
                    color: #64748B;
                    cursor: pointer;
                }
                .tool-btn-circle {
                    width: 48,
                    height: 48,
                    border-radius: '50%',
                    border: '1px solid #E2E8F0',
                    background-color: white,
                    color: #64748B,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer'
                }
            `}</style>
        </div>
    );
};

export default DrawingScreen;

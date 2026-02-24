import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const ProductForm = ({ onAddProduct }) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            id: Math.random(),
            title: title,
            price: price,
       
            image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=500', 
            description: 'Espécie botânica selecionada, ideal para decoração e harmonização de ambientes.'
        };
        onAddProduct(newProduct);
        setTitle('');
        setPrice('');
    };

    return (
        <div className="surface-card p-5 shadow-3 border-round-xl border-top-3 border-teal-600">
            <form onSubmit={handleSubmit} className="p-fluid grid">
                <div className="field col-12 md:col-6">
                    <label className="font-bold">Nome da Flor/Planta</label>
                    <InputText placeholder="Ex: Orquídea rara" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="field col-12 md:col-6">
                    <label className="font-bold">Preço Unitário (R$)</label>
                    <InputText placeholder="Ex: 45.90" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="col-12 md:col-4 md:col-offset-8">
                    <Button type="submit" label="Plantar no Jardim" icon="pi pi-check" className="p-button-teal" />
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
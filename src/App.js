import React, { useState, useEffect } from 'react';
import "primereact/resources/themes/lara-light-teal/theme.css"; 
import "primereact/resources/primereact.min.css"; 
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import { Button } from 'primereact/button';
import Storefront from './views/Storefront';
import ProductForm from './components/ProductForm';

function App() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('meuAcervoFlores');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const [view, setView] = useState('loja');

  useEffect(() => {
    localStorage.setItem('meuAcervoFlores', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
    setView('loja'); 
  };

 
  const resetGarden = () => {
    if (window.confirm("Deseja realmente limpar seu jardim e recarregar as flores originais?")) {
      localStorage.removeItem('meuAcervoFlores');
      setProducts([]); 
  };

  return (
    <div className="bg-bluegray-50 min-h-screen">
      <header className="bg-teal-700 text-white p-4 shadow-3">
        <div className="max-w-custom mx-auto flex justify-content-between align-items-center" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h1 className="m-0 text-xl md:text-2xl font-light tracking-wide cursor-pointer" onClick={() => setView('loja')}>
            <i className="pi pi-sun mr-2"></i> JARDIM & CORES
          </h1>
          
          <div className="flex gap-2">
      
            {view === 'loja' && (
              <Button 
                icon="pi pi-refresh" 
                className="p-button-rounded p-button-danger p-button-text text-white hover:bg-teal-600" 
                onClick={resetGarden}
                tooltip="Resetar Jardim"
              />
            )}
            
            <Button 
              label={view === 'loja' ? "Nova Flor" : "Voltar"} 
              icon={view === 'loja' ? "pi pi-plus" : "pi pi-arrow-left"} 
              className="p-button-sm p-button-info border-round-lg shadow-2"
              onClick={() => setView(view === 'loja' ? 'cadastro' : 'loja')}
            />
          </div>
        </div>
      </header>

      <main className="p-4 md:p-6 mx-auto" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {view === 'loja' ? (
          <Storefront products={products} setProducts={setProducts} />
        ) : (
          <div className="fadein">
            <h2 className="text-teal-900 mb-4 flex align-items-center">
                <i className="pi pi-pencil mr-2"></i> Adicionar ao Catálogo
            </h2>
            <ProductForm onAddProduct={addProduct} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
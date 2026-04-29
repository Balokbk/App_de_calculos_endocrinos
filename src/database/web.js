// Esse arquivo é para caso use de forma Web a aplicação, usando o LocalStorage para salvar os dados.

const STORAGE_KEY = 'calculations';

function getStorage(){
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function setStorage(data){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function initDB(){
    // Não precisa fazer nada, o localStorage é criado automaticamente quando usamos pela primeira vez.
}

export function saveCalculation({ type, title, data, result }){
    const existing = getStorage();

    existing.push({
        id: Date.now(),
        type,
        title: title || '',
        data,
        result,
        created_at: new Date().toISOString()
    });

    setStorage(existing);
}

export function getAllCalculations(){
    return getStorage().sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
}

export function getCalculationsByType(type){
    return getStorage()
        .filter(item => item.type === type)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

export function updateCalculationTitle(id, title){
    const data = getStorage();

    const updated = data.map(item => 
        item.id === id ? { ...item, title } : item
    );
    setStorage(updated);
}

export function deleteCalculation(id){
    const filtered = getStorage().filter(item => item.id !== id);
    setStorage(filtered);
}
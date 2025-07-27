export const useNumericInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.,]/g, ''); // Permite apenas números e vírgula/ponto
};
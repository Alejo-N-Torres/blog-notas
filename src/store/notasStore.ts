import { create } from "zustand";

interface EstilosType {
    color: string;
    size: string;
    subrayado: string;
    bold: string;
    italica: string;
}

interface Nota {
    nombre: string;
    contenido: string | null;
}

interface NotasState {
    NombresNotas: string[];
    NotaSeleccionada: Nota | null;
    estilosNotaSeleccionada: EstilosType;
    agregarNombreNota: (name: string) => void;
    setNombresNotas: (names: string[]) => void;
    setNotaSeleccionada: (nota: Nota | null) => void;
    eliminarNombreNota: (name: string) => void;

    setEstilosNotaSeleccionada: (estilos: EstilosType) => void;
}

export const useNotasStore = create<NotasState>((set) => ({
    NombresNotas: [],
    NotaSeleccionada: null,
    estilosNotaSeleccionada: {
        color: "",
        size: "",
        subrayado: "",
        bold: "",
        italica: "",
    },
    agregarNombreNota: (name) =>
        set((state) => ({
            NombresNotas: [...state.NombresNotas, name],
        })),
    setNombresNotas: (names) => set({ NombresNotas: names }),
    setNotaSeleccionada: (nota) => set({ NotaSeleccionada: nota }),
    eliminarNombreNota: (name) =>
        set((state) => ({
            NombresNotas: state.NombresNotas.filter((n) => n !== name),
        })),
    setEstilosNotaSeleccionada: (estilos: EstilosType) =>
        set({ estilosNotaSeleccionada: estilos }),
}));

import { useNotasStore } from "../store/notasStore";
import { twMerge } from "tailwind-merge";
import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { documentDir, join } from "@tauri-apps/api/path";
import toast from "react-hot-toast";
import { FiTrash, FiX } from "react-icons/fi";

interface ItemNotaProps {
    tituloNota: string;
}

interface EstilosType {
    color: string;
    size: string;
    subrayado: string;
    bold: string;
    italica: string;
}

const ItemNota: React.FC<ItemNotaProps> = (props) => {
    const setStyles = useNotasStore(
        (state) => state.setEstilosNotaSeleccionada
    );

    const setNotaSeleccionada = useNotasStore(
        (state) => state.setNotaSeleccionada
    );
    const NotaSeleccionada = useNotasStore((state) => state.NotaSeleccionada);

    const { tituloNota } = props;

    const eliminarNombreNota = useNotasStore(
        (state) => state.eliminarNombreNota
    );
    const handleDelete = async (tituloNota: string) => {
        const accept = await window.confirm(
            "¿Estas seguro que quieres eliminar la nota?"
        );
        if (!accept) return;
        const documentPath = await documentDir();
        const filePath = await join(documentPath, "FilesNotas", tituloNota);
        await removeFile(filePath);
        eliminarNombreNota(tituloNota);
        //---borrar estilos---//
        const tituloStyleNota = tituloNota + "-style.json";
        const fileStylePath = await join(
            documentPath,
            "FilesNotas",
            "styles",
            tituloStyleNota
        );
        await removeFile(fileStylePath);

        //---toast---//
        toast.success("Nota Eliminada", {
            duration: 2000,
            position: "bottom-right",
            style: {
                background: "#202020",
                color: "#fff",
            },
        });
        setNotaSeleccionada(null);
    };

    return (
        <div
            className={twMerge(
                "task py-2 px-4 hover:bg-neutral-900 hover:cursor-pointer flex justify-between",
                NotaSeleccionada?.nombre === tituloNota ? "bg-cazul" : ""
            )}
            onClick={async () => {
                const documentPath = await documentDir();
                const filePath = await join(
                    documentPath,
                    "FilesNotas",
                    tituloNota
                );
                const nota = await readTextFile(filePath);
                console.log(nota);
                setNotaSeleccionada({ nombre: tituloNota, contenido: nota });
                //---actualizar estilos---//
                const tituloStyleNota = tituloNota + "-style.json";
                const fileStylePath = await join(
                    documentPath,
                    "FilesNotas",
                    "styles",
                    tituloStyleNota
                );
                const fileStyle: EstilosType = JSON.parse(
                    await readTextFile(fileStylePath)
                );
                console.log(fileStyle);
                setStyles(fileStyle);
            }}
        >
            <h1>{tituloNota}</h1>
            {NotaSeleccionada?.nombre === tituloNota && (
                <div className="flex gap-2 justify-center items-center">
                    <FiTrash
                        onClick={(e: React.MouseEvent<SVGElement>) => {
                            e.stopPropagation();
                            handleDelete(tituloNota);
                        }}
                    />
                    <FiX
                        onClick={(e: React.MouseEvent<SVGElement>) => {
                            e.stopPropagation();
                            setNotaSeleccionada(null);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default ItemNota;

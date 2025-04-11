import Link from "next/link";

const CategoriesPage = () => {
    return (
        <div>
            <h2>Categories Page</h2>
            <p>Lista de categorias - otro componente, en la lista podremos eliminar y modificar con dos botones</p>
            <div>
                <Link href="/categories/newCategory">Nueva Categoría</Link>
            </div>
        </div>
    );
};


export default CategoriesPage;
import type { BookDto } from "@repo/shared";

type BooksTableProps = {
  items: BookDto[];
  editingId: number | null;
  editingTitle: string;
  editingAuthor: string;
  onStartEdit: (book: BookDto) => void;
  onEditTitleChange: (value: string) => void;
  onEditAuthorChange: (value: string) => void;
  onSaveEdit: (id: number) => void;
  onCancelEdit: () => void;
  onDelete: (id: number) => void;
};

export function BooksTable({
  items,
  editingId,
  editingTitle,
  editingAuthor,
  onStartEdit,
  onEditTitleChange,
  onEditAuthorChange,
  onSaveEdit,
  onCancelEdit,
  onDelete
}: BooksTableProps) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>Titulo</th>
          <th style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>Autor</th>
          <th style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {items.map((book) => (
          <tr key={book.id}>
            {editingId === book.id ? (
              <>
                <td>
                  <input
                    value={editingTitle}
                    onChange={(event) => onEditTitleChange(event.target.value)}
                  />
                </td>
                <td>
                  <input
                    value={editingAuthor}
                    onChange={(event) => onEditAuthorChange(event.target.value)}
                  />
                </td>
                <td>
                  <button type="button" onClick={() => onSaveEdit(book.id)}>
                    Guardar
                  </button>
                  <button type="button" onClick={onCancelEdit}>
                    Cancelar
                  </button>
                </td>
              </>
            ) : (
              <>
                <td>{book.title}</td>
                <td>{book.author ?? "-"}</td>
                <td>
                  <button type="button" onClick={() => onStartEdit(book)}>
                    Editar
                  </button>
                  <button type="button" onClick={() => onDelete(book.id)}>
                    Borrar
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

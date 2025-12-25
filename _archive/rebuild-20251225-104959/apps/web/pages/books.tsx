import { useState } from "react";
import type { BookDto } from "@repo/shared";
import { logout } from "../lib/api";
import { useAuthToken } from "../hooks/use-auth";
import { useBooks } from "../hooks/use-books";
import { BooksTable } from "../components/books-table";
import { Pagination } from "../components/pagination";

export default function BooksPage() {
  const { ready, isAuthenticated, clearToken } = useAuthToken();
  const books = useBooks(ready && isAuthenticated);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingAuthor, setEditingAuthor] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const startEdit = (book: BookDto) => {
    setEditingId(book.id);
    setEditingTitle(book.title);
    setEditingAuthor(book.author ?? "");
  };

  const resetEdit = () => {
    setEditingId(null);
    setEditingTitle("");
    setEditingAuthor("");
  };

  const handleCreate = async () => {
    setFormError(null);
    if (!title.trim()) {
      setFormError("Titulo requerido");
      return;
    }
    const ok = await books.create({
      title: title.trim(),
      author: author.trim() ? author.trim() : null
    });
    if (ok) {
      setTitle("");
      setAuthor("");
    }
  };

  const handleUpdate = async (id: number) => {
    setFormError(null);
    if (!editingTitle.trim()) {
      setFormError("Titulo requerido");
      return;
    }
    const ok = await books.update(id, {
      title: editingTitle.trim(),
      author: editingAuthor.trim() ? editingAuthor.trim() : null
    });
    if (ok) {
      resetEdit();
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Ignore logout errors for MVP; token is removed locally.
    } finally {
      clearToken();
      window.location.href = "/login";
    }
  };

  if (!ready) {
    return (
      <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
        <h1>Books</h1>
        <p>Validando sesion...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
        <h1>Books</h1>
        <p>Necesitas iniciar sesion primero.</p>
        <a href="/login">Ir a login</a>
      </main>
    );
  }

  const errorMessage = formError ?? books.error;

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <h1>Books</h1>
      <p>
        <button type="button" onClick={handleLogout}>
          Cerrar sesion
        </button>
      </p>
      <section style={{ marginBottom: "1.5rem" }}>
        <h2>Crear libro</h2>
        <div style={{ display: "grid", gap: "0.5rem", maxWidth: 360 }}>
          <input
            placeholder="Titulo"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            placeholder="Autor (opcional)"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
          <button type="button" onClick={handleCreate}>
            Guardar
          </button>
        </div>
      </section>
      <section style={{ marginBottom: "1rem" }}>
        <h2>Listado</h2>
        <input
          placeholder="Buscar por titulo o autor"
          value={books.search}
          onChange={(event) => {
            books.setPage(1);
            books.setSearch(event.target.value);
          }}
        />
      </section>
      {errorMessage && <p style={{ color: "crimson" }}>{errorMessage}</p>}
      {books.loading && !books.data ? (
        <p>Cargando...</p>
      ) : !books.data ? (
        <p>Sin datos.</p>
      ) : (
        <>
          <BooksTable
            items={books.data.items}
            editingId={editingId}
            editingTitle={editingTitle}
            editingAuthor={editingAuthor}
            onStartEdit={startEdit}
            onEditTitleChange={setEditingTitle}
            onEditAuthorChange={setEditingAuthor}
            onSaveEdit={handleUpdate}
            onCancelEdit={resetEdit}
            onDelete={books.remove}
          />
          <Pagination
            page={books.data.pagination.page}
            totalPages={books.data.pagination.totalPages}
            onPageChange={books.setPage}
          />
        </>
      )}
    </main>
  );
}

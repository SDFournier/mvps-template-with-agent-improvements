import { useCallback, useEffect, useState } from "react";
import type { BookCreateDto, BookListResponseDto, BookUpdateDto } from "@repo/shared";
import { createBook, deleteBook, listBooks, updateBook } from "../lib/api";

const pageSize = 5;

export function useBooks(enabled: boolean) {
  const [data, setData] = useState<BookListResponseDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await listBooks({ page, pageSize, search });
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    load();
  }, [enabled, load]);

  const create = async (payload: BookCreateDto): Promise<boolean> => {
    setError(null);
    try {
      await createBook(payload);
      await load();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear");
      return false;
    }
  };

  const update = async (id: number, payload: BookUpdateDto): Promise<boolean> => {
    setError(null);
    try {
      await updateBook(id, payload);
      await load();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar");
      return false;
    }
  };

  const remove = async (id: number): Promise<boolean> => {
    setError(null);
    try {
      await deleteBook(id);
      await load();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al borrar");
      return false;
    }
  };

  return {
    data,
    error,
    loading,
    page,
    pageSize,
    search,
    setPage,
    setSearch,
    reload: load,
    create,
    update,
    remove
  };
}

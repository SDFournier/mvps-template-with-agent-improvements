import { render, screen } from "@testing-library/react";
import BooksPage from "../pages/books";

const mockUseAuthToken = jest.fn();
const mockUseBooks = jest.fn();

jest.mock("../hooks/use-auth", () => ({
  useAuthToken: () => mockUseAuthToken()
}));

jest.mock("../hooks/use-books", () => ({
  useBooks: () => mockUseBooks()
}));

describe("BooksPage", () => {
  it("prompts login when unauthenticated", () => {
    mockUseAuthToken.mockReturnValue({
      ready: true,
      isAuthenticated: false,
      clearToken: jest.fn()
    });
    mockUseBooks.mockReturnValue({
      data: null,
      error: null,
      loading: false,
      page: 1,
      pageSize: 5,
      search: "",
      setPage: jest.fn(),
      setSearch: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn()
    });
    render(<BooksPage />);

    expect(screen.getByText("Necesitas iniciar sesion primero.")).toBeInTheDocument();
    expect(screen.getByText("Ir a login")).toBeInTheDocument();
  });

  it("renders table when authenticated", () => {
    mockUseAuthToken.mockReturnValue({
      ready: true,
      isAuthenticated: true,
      clearToken: jest.fn()
    });
    mockUseBooks.mockReturnValue({
      data: {
        items: [{ id: 1, title: "Demo", author: "Autor" }],
        pagination: { page: 1, pageSize: 5, total: 1, totalPages: 1 }
      },
      error: null,
      loading: false,
      page: 1,
      pageSize: 5,
      search: "",
      setPage: jest.fn(),
      setSearch: jest.fn(),
      create: jest.fn(async () => true),
      update: jest.fn(async () => true),
      remove: jest.fn(async () => true)
    });

    render(<BooksPage />);

    expect(screen.getByText("Demo")).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Autor" })).toBeInTheDocument();
  });
});

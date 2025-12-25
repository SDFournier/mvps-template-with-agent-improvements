import { render, screen } from "@testing-library/react";
import AdminPage from "../pages/admin";

const mockUseAuthToken = jest.fn();
const mockUseMe = jest.fn();

jest.mock("../hooks/use-auth", () => ({
  useAuthToken: () => mockUseAuthToken()
}));

jest.mock("../hooks/use-me", () => ({
  useMe: () => mockUseMe()
}));

jest.mock("../lib/api", () => ({
  getAdminOverview: jest.fn()
}));

describe("AdminPage", () => {
  it("blocks non-admin users", () => {
    mockUseAuthToken.mockReturnValue({ ready: true, isAuthenticated: true });
    mockUseMe.mockReturnValue({ user: { role: "user" }, loading: false, error: null });

    render(<AdminPage />);

    expect(screen.getByText("No tenes permisos para ver esta seccion.")).toBeInTheDocument();
  });
});

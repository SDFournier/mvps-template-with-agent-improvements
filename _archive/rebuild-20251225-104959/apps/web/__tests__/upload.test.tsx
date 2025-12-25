import { fireEvent, render, screen } from "@testing-library/react";
import UploadPage from "../pages/upload";

const mockUseAuthToken = jest.fn();
const mockUploadFile = jest.fn();

jest.mock("../hooks/use-auth", () => ({
  useAuthToken: () => mockUseAuthToken()
}));

jest.mock("../lib/api", () => ({
  uploadFile: (...args: unknown[]) => mockUploadFile(...args)
}));

describe("UploadPage", () => {
  it("shows error when no file selected", () => {
    mockUseAuthToken.mockReturnValue({ ready: true, isAuthenticated: true });
    render(<UploadPage />);

    fireEvent.click(screen.getByText("Subir"));

    expect(screen.getByText("Selecciona un archivo")).toBeInTheDocument();
  });
});

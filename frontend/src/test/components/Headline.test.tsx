import React from "react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { useModalContext } from "../../context/ModalContext";
import { useUsers } from "../../hooks/useUsers";
import Headline from "../../components/contactHeadline/Headline";

vi.mock("../../context/ModalContext", () => ({
  useModalContext: vi.fn(() => ({
    openModal: vi.fn(),
    closeModal: vi.fn(),
  })),
}));
vi.mock("../../hooks/useUsers", () => ({
  useUsers: vi.fn(),
}));

describe("Headline Component", () => {
  afterEach(() => cleanup());

  it("renders loading state", () => {
    (useUsers as jest.Mock).mockReturnValue({
      userQuery: { isLoading: true },
    });
    render(<Headline />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useUsers as jest.Mock).mockReturnValue({ userQuery: { isError: true } });
    render(<Headline />);
    expect(screen.getByText("Error loading user")).toBeInTheDocument();
  });

  it("renders user data", () => {
    (useUsers as jest.Mock).mockReturnValue({
      userQuery: {
        isLoading: false,
        isError: false,
        data: { imageName: "avatar.png" },
      },
    });
    render(<Headline />);
    expect(screen.getByAltText("Avatar")).toBeInTheDocument();
  });

  it("opens modal on button click", () => {
    const openModal = vi.fn();
    (useModalContext as jest.Mock).mockReturnValue({ openModal });
    (useUsers as jest.Mock).mockReturnValue({
      userQuery: { isLoading: false, isError: false, data: {} },
    });
    render(<Headline />);
    const addButton = screen.getByRole("button", { name: /add new/i });
    fireEvent.click(addButton);
    expect(openModal).toHaveBeenCalled();
  });
});

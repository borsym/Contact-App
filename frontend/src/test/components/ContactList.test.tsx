import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { useContacts } from "../../hooks/useContacts";
import { useModalContext } from "../../context/ModalContext";
import { user } from "../constants";
import ContactList from "../../components/contacts/ContactList";
import React from "react";
import "@testing-library/jest-dom/vitest";

vi.mock("../../context/ModalContext", () => ({
  useModalContext: vi.fn(() => ({
    openModal: vi.fn(),
    closeModal: vi.fn(),
  })),
}));
vi.mock("../../hooks/useContacts", () => ({
  useContacts: vi.fn(),
}));

describe("ContactList Component", () => {
  afterEach(() => cleanup());
  it("renders loading state", () => {
    (useContacts as jest.Mock).mockReturnValue({
      contactsQuery: { isLoading: true },
    });
    render(<ContactList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useContacts as jest.Mock).mockReturnValue({
      contactsQuery: { isError: true },
    });
    render(<ContactList />);
    expect(screen.getByText("Error loading contacts")).toBeInTheDocument();
  });

  it("renders contacts", () => {
    useContacts.mockReturnValue({
      contactsQuery: {
        isLoading: false,
        isError: false,
        data: [user],
      },
    });
    render(<ContactList />);
    expect(screen.getByText(user.name)).toBeInTheDocument();
  });

  it("opens modal on edit button click", () => {
    const openModal = vi.fn();
    useModalContext.mockReturnValue({ openModal });
    useContacts.mockReturnValue({
      contactsQuery: {
        isLoading: false,
        isError: false,
        data: [user],
      },
    });
    render(<ContactList />);
    const contactElement = screen.getByText(user.name).closest("div");
    fireEvent.mouseEnter(contactElement);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[2]);
    const editOption = screen.getByText("Edit");
    fireEvent.click(editOption);
    expect(openModal).toHaveBeenCalled();
  });
});

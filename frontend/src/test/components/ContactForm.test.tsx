import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
  getByLabelText,
} from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { useContacts } from "../../hooks/useContacts";
import { ModalProvider, useModalContext } from "../../context/ModalContext";
import { user } from "../constants";

import ContactForm from "../../components/modal/ContactForm";
import React from "react";
import "@testing-library/jest-dom/vitest";

const mockedUpdateContactMutation = { mutateAsync: vi.fn() };



vi.mock("../../hooks/useContacts", () => ({
  useContacts: vi.fn(() => ({
    createContactMutation: vi.fn(),
    updateContactMutation: mockedUpdateContactMutation,
  })),
}));

vi.mock("../../context/ModalContext", () => {
  return {
    useModalContext: vi.fn(() => ({
      currentContact: user,
      closeModal: vi.fn(),
    })),
    ModalProvider: ({ children }) => <div>{children}</div>,
  };
});

describe("ContactForm Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders form fields", () => {
    // Mock the return value of useModalContext
    render(
      <ModalProvider>
        <ContactForm />
      </ModalProvider>
    );

    (useModalContext as jest.Mock).mockReturnValue({ currentContact: null });

    // Mock the return value of useContacts if needed
    (useContacts as jest.Mock).mockReturnValue({
      createContactMutation: { mutateAsync: vi.fn() },
      updateContactMutation: { mutateAsync: vi.fn() },
    });

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });
  it("submits form", async () => {
    render(
      <ModalProvider>
        <ContactForm />
      </ModalProvider>
    );

    const createContactMutation = { mutateAsync: vi.fn() };

    useContacts.mockReturnValue({ createContactMutation });
    useModalContext.mockReturnValue({
      currentContact: null,
      closeModal: vi.fn(),
    });

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: user.name },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: user.phoneNumber },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: user.email },
    });
    fireEvent.click(screen.getByText("Done"));
    await waitFor(() => {
      expect(createContactMutation.mutateAsync).toHaveBeenCalled();
    });
  });

  it("cancels changes", async () => {
    const updateContactMutation = { mutateAsync: vi.fn() };
    const closeModal = vi.fn();
    (useContacts as jest.Mock).mockReturnValue({ updateContactMutation });
    (useModalContext as jest.Mock).mockReturnValue({
      currentContact: user,
      closeModal,
    });

    render(
      <ModalProvider>
        <ContactForm />
      </ModalProvider>
    );

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Changed Name" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "changed@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "1234567890" },
    });

    fireEvent.click(screen.getByText("Cancel"));

    expect(updateContactMutation.mutateAsync).not.toHaveBeenCalled();
    expect(closeModal).toHaveBeenCalled();
  });
});

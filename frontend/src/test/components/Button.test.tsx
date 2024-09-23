import { describe, it, expect, afterEach, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { randomText } from "../constants";
import Button from "../../components/common/button/Button";
import React from "react";
import "@testing-library/jest-dom/vitest";

describe("Button Component", () => {
  afterEach(() => cleanup());
  it("renders with label", () => {
    render(<Button label={randomText} />);
    expect(screen.getByText(randomText)).toBeInTheDocument();
  });

  it("renders with icon", () => {
    const Icon = () => <span>Icon</span>;
    render(<Button label={randomText} icon={<Icon />} />);
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  it("applies the correct variant class", () => {
    render(<Button label={randomText} variant="secondary" />);
    expect(screen.getByText(randomText)).toHaveClass("bg-secondary");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button label={randomText} onClick={handleClick} />);
    fireEvent.click(screen.getByText(randomText));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

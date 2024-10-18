import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("ToDoList Component", () => {
  test("displays all items in the list", () => {
    render(<ToDoList/>);

    const groceryItems = screen.getAllByRole("checkbox");
    expect(groceryItems.length).toBeGreaterThan(0); // Check that items are rendered
    groceryItems.forEach(item => {
      expect(item).toBeInTheDocument(); // Ensure each item is displayed
    });
  });

  
  test("updates number of checked items in the title", () => {
    render(<ToDoList/>);

    const initialCheckedCount = screen.getByText("Items bought: 0");
    expect(initialCheckedCount).toBeInTheDocument();

    const firstItemCheckbox = screen.getAllByRole("checkbox")[0];
    
    // Check the first item 
    fireEvent.click(firstItemCheckbox);
    const updatedCheckedCount = screen.getByText("Items bought: 1");
    expect(updatedCheckedCount).toBeInTheDocument();

    // Uncheck the first item now its at the bottom of the list
    fireEvent.click(firstItemCheckbox);
    const revertedCheckedCount = screen.getByText("Items bought: 2");
    expect(revertedCheckedCount).toBeInTheDocument();
  });

  
  test("unchecks all items and updates the title to 0", () => {
    render(<ToDoList/>);
  
    // Check all items
    const groceryItems = screen.getAllByRole("checkbox");
    groceryItems.forEach(item => {
      fireEvent.click(item);
    });
  
    // Uncheck all items
    groceryItems.forEach(item => {
      fireEvent.click(item);
    });
  
    const finalCheckedCount = screen.getByText("Items bought: 0");
    expect(finalCheckedCount).toBeInTheDocument();
  });
});

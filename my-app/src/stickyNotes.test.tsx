import { render, screen, fireEvent } from "@testing-library/react";
import StickyNotes from "./stickyNotes";

describe("StickyNotes Component", () => {
  test("renders create note form", () => {
    render(<StickyNotes />);

    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
  });



  test("creates a new note", () => {
    render(<StickyNotes />);

    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Note content" } });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
  });

  test("reads all notes", () => {
    render(<StickyNotes />);

    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "Note 1" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Content 1" } });
    fireEvent.click(createNoteButton);

    fireEvent.change(createNoteTitleInput, { target: { value: "Note 2" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Content 2" } });
    fireEvent.click(createNoteButton);

    const note1Title = screen.getByText("Note 1");
    const note1Content = screen.getByText("Content 1");
    const note2Title = screen.getByText("Note 2");
    const note2Content = screen.getByText("Content 2");

    expect(note1Title).toBeInTheDocument();
    expect(note1Content).toBeInTheDocument();
    expect(note2Title).toBeInTheDocument();
    expect(note2Content).toBeInTheDocument();
  });

  test("updates a note", () => {
    render(<StickyNotes />);

    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "Very very very very Old Note" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Very very very very Old content" } });
    fireEvent.click(createNoteButton);

    // Ensure the note is rendered before trying to edit it
    const oldNoteTitle = screen.getByText("Very very very very Old Note");
    const oldNoteContent = screen.getByText("Very very very very Old content");

    expect(oldNoteTitle).toBeInTheDocument();
    expect(oldNoteContent).toBeInTheDocument();

    // Use a more specific query to find the editable elements
    const editTitle = screen.getByTestId("edit-title-1"); 
    const editContent = screen.getByTestId("edit-content-1");

    // Simulate editing the title and content
    fireEvent.blur(editTitle, { target: { textContent: "Newly Updated Note hheheh" } });
    fireEvent.blur(editContent, { target: { textContent: "Newly Updated content" } });

    const updatedNoteTitle = screen.getByText("Newly Updated Note hheheh");
    const updatedNoteContent = screen.getByText("Newly Updated content");

    expect(updatedNoteTitle).toBeInTheDocument();
    expect(updatedNoteContent).toBeInTheDocument();
  });

  test("deletes a note", () => {
    render(<StickyNotes />);

    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "Not Useful Note" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "AHUEHSFIUSHDFIUHAEIUDSHFIUDAHSIUFHUI" } });
    fireEvent.click(createNoteButton);

    // Ensure the note is rendered before trying to delete it
    const newNoteTitle = screen.getByText("Not Useful Note");
    const newNoteContent = screen.getByText("AHUEHSFIUSHDFIUHAEIUDSHFIUDAHSIUFHUI");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();

    // Use a more specific query to find the delete button
    const deleteButton = screen.getByTestId("delete-button-7");
    fireEvent.click(deleteButton);

    const deletedNoteTitle = screen.queryByText("Not Useful Note");
    const deletedNoteContent = screen.queryByText("AHUEHSFIUSHDFIUHAEIUDSHFIUDAHSIUFHUI");

    expect(deletedNoteTitle).not.toBeInTheDocument();
    expect(deletedNoteContent).not.toBeInTheDocument();
  });

  test("delete all sticky notes", () => {
    render(<StickyNotes />);
 
    let deleteButton = screen.getByTestId("delete-button-6");
    fireEvent.click(deleteButton);
     deleteButton = screen.getByTestId("delete-button-5");
    fireEvent.click(deleteButton);
     deleteButton = screen.getByTestId("delete-button-4");
    fireEvent.click(deleteButton);
     deleteButton = screen.getByTestId("delete-button-3");
    fireEvent.click(deleteButton);
     deleteButton = screen.getByTestId("delete-button-2");
    fireEvent.click(deleteButton);

    //test if still in doc
    const deletedNoteTitle = screen.queryByText("test note 1 title");
    expect(deletedNoteTitle).toBeInTheDocument();

    //test after deletion
    deleteButton = screen.getByTestId("delete-button-1");
    fireEvent.click(deleteButton);
    expect(deletedNoteTitle).not.toBeInTheDocument();

  
  });

});
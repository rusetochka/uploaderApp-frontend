import { render, fireEvent, screen } from '@testing-library/react';
import { File } from '../components/File';

test("shows the sharing screen", () => {
    render(<File />);
    const sharingScreen = screen.getById('sharing-screen');
    const btn = screen.getById('share-btn');
    fireEvent.click(btn);
    expect(sharingScreen).toHaveTextContent("Share this document via link below");
});
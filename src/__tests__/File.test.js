import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { File } from '../components/File.js';

test("should prints out the contents of the File Component", () => {   
    render(<File name='Testfile.txt'
                 type='txt'
                 key='dfsf4444f'
                 id='dfsf4444f'
                 date=''
                 size='5455'
                 downloaded='3'
                 checkFile={() => {}}
                 uncheckFile={() => {}}
                 />);
    screen.debug();
});

test("should have name of a file as a title",  () => {
    render(<File name='Testfile.txt'
                 type='txt'
                 key='dfsf4444f'
                 id='dfsf4444f'
                 date=''
                 size='5455'
                 downloaded='3'
                 checkFile={() => {}}
                 uncheckFile={() => {}}
                 />);
    const container = screen.getByTestId('1');
    const filename = within(container).getByText('Testfile.txt');
    expect(filename).toHaveTextContent('Testfile.txt');

});

test("should start downloading if the download button clicked", () => {
    render(<File name='Testfile.txt'
                 type='txt'
                 key='dfsf4444f'
                 id='dfsf4444f'
                 date=''
                 size='5455'
                 downloaded='3'
                 checkFile={() => {}}
                 uncheckFile={() => {}}
                 updateFiles={() => {}}
                 />);
    console.log = jest.fn();
    userEvent.click(screen.getByText('Download'));
    
    //console.log('Downloading has started');
    expect(console.log).toHaveBeenCalledWith('Downloading has started');
});

test("should show the sharing display if the share button clicked" , () => {
    render(<File name='Testfile.txt'
                 type='txt'
                 key='dfsf4444f'
                 id='dfsf4444f'
                 date=''
                 size='5455'
                 downloaded='3'
                 checkFile={() => {}}
                 uncheckFile={() => {}}
                 />);
    userEvent.click(screen.getByText('Share'));
    const expected = screen.getByText('Share this document via link below');
    expect(expected).toHaveTextContent('Share this document via link below');
});

test("should hide the sharing screen", () => {
    render(<File name='Testfile.txt'
                 type='txt'
                 key='dfsf4444f'
                 id='dfsf4444f'
                 date=''
                 size='5455'
                 downloaded='3'
                 checkFile={() => {}}
                 uncheckFile={() => {}}
                 />);
    userEvent.click(screen.getByText('Share'));
    userEvent.click(screen.getByText('Done'));
    const expected = screen.queryByTestId('2');
    expect(expected).toHaveClass('d-none');
});

describe("should load correct icon depending on the file extention", () => {
    it("should render pdf icon", () => {
        render(<File name='Testfile.pdf'
                 type='pdf'
                 key='dfsf4444f'
                 />);
        const image = screen.getByTestId('4');
        const imgByAlt = screen.getByAltText('pdf icon');
        expect(image).toEqual(imgByAlt);
    });

    it("should render image icon", () => {
        render(<File name='Testfile.jpg'
                 type='jpg'
                 key='dfsf4444f'
                 />);
        const image = screen.getByTestId('4');
        const imgByAlt = screen.getByAltText('jpg icon');
        expect(image).toEqual(imgByAlt);
    });

    it("should render doc icon", () => {
        render(<File name='Testfile.doc'
                 type='doc'
                 key='dfsf4444f'
                 />);
        const image = screen.getByTestId('4');
        const imgByAlt = screen.getByAltText('doc icon');
        expect(image).toEqual(imgByAlt);
    });

    it("should render docx icon", () => {
        render(<File name='Testfile.docx'
                 type='docx'
                 key='dfsf4444f'
                 />);
        const image = screen.getByTestId('4');
        const imgByAlt = screen.getByAltText('docx icon');
        expect(image).toEqual(imgByAlt);
    });

    it("should render xls icon", () => {
        render(<File name='Testfile.xls'
                 type='xls'
                 key='dfsf4444f'
                 />);
        const image = screen.getByTestId('4');
        const imgByAlt = screen.getByAltText('xls icon');
        expect(image).toEqual(imgByAlt);
    });

    it("should render xlsx icon", () => {
        render(<File name='Testfile.xlsx'
                 type='xlsx'
                 key='dfsf4444f'
                 />);
        const image = screen.getByTestId('4');
        const imgByAlt = screen.getByAltText('xlsx icon');
        expect(image).toEqual(imgByAlt);
    });

    it("should render txt icon", () => {
        render(<File name='Testfile.txt'
                 type='txt'
                 key='dfsf4444f'
                 />);
        const image = screen.getByTestId('4');
        const imgByAlt = screen.getByAltText('txt icon');
        expect(image).toEqual(imgByAlt);
    });

    it("should render unknown icon", () => {
        render(<File name='Testfile.rar'
                 type='rar'
                 key='dfsf4444f'
                 />);
        const image = screen.getByTestId('4');
        const imgByAlt = screen.getByAltText('rar icon');
        expect(image).toEqual(imgByAlt);
    });
    
});

test("should show numbers of downloads", () => {
    render(<File name='Testfile.txt'
                 type='txt'
                 key='dfsf4444f'
                 id='dfsf4444f'
                 date=''
                 size='5455'
                 downloaded='3'
                 checkFile={() => {}}
                 uncheckFile={() => {}}
                 />);
    const text = screen.getByTestId('5');
    expect(text).toHaveTextContent('Downloaded: 3 time(s)');
});

describe("should floor the size if needed", () => {
    it("should show the size in KBs if it is less then 1MB", () => {
        render(<File name='Testfile.txt'
                 type='txt'
                 key='dfsf4444f'
                 size='100'
                 />);
        const size = screen.getByTestId('6');
        expect(size).toHaveTextContent('100');
    });

    it("should show the size in GBs if it is more then 1024MB", () => {
        render(<File name='Testfile.txt'
                 type='txt'
                 key='dfsf4444f'
                 size='1500000'
                 />);
        const size = screen.getByTestId('6');
        expect(size).toHaveTextContent('1 GB');
    });
    
});


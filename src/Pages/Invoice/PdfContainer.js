
import React, { createRef } from 'react';

const PdfContainer = (props) => {
    const bodyRef = createRef();
    const createPdf = () => props.createPdf(bodyRef.current);
    return (
        <section className="pdf-container">
            <section className="pdf-toolbar">
                <button onClick={createPdf}>Create PDF</button>
            </section>
            <section className="" ref={bodyRef}>
                {props.children}
            </section>
        </section>
    );
};

export default PdfContainer;
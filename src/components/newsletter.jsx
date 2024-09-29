import React, { useState } from "react";
import { addText } from '../service/textService';

function Newsletter() {
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addText(text);
        // Tùy chọn: Xóa văn bản sau khi gửi
        setText('');
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <section className="newsletter_area">
                    <div className="container">
                        <div className="row newsletter_inner">
                            <div className="col-lg-6">
                                <div className="news_left_text">
                                    <h4>
                                        Join our Newsletter list to get all the latest offers, discounts
                                        and other benefits
                                    </h4>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="newsletter_form">
                                    <div className="input-group">
                                        <input
                                            value={text}
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => setText(e.target.value)}
                                            placeholder="Vui lòng nhập ít nhất 10 kí tự..."
                                            required
                                        />
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary" type="submit">
                                                Subscribe Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>

        </div>
    );
}

export default Newsletter
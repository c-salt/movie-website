import React from 'react';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        const { user, users } = this.state;
        return (
            <h1>I'm a home page! Elijah is little cool!~</h1>
        );
    }
}

export { HomePage };

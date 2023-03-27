import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';

const DBPedia = ({ steps, triggerNextStep }) => {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState('');
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        const search = steps.search.value;
        const endpoint = encodeURI('https://dbpedia.org');
        const query = encodeURI(`
      select * where {
      ?x rdfs:label "${search}"@en .
      ?x rdfs:comment ?comment .
      FILTER (lang(?comment) = 'en')
      } LIMIT 100
    `);
        const queryUrl = `https://dbpedia.org/sparql/?default-graph-uri=${endpoint}&query=${query}&format=json`;

        const xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', readyStateChange);

        function readyStateChange() {
            if (this.readyState === 4) {
                const data = JSON.parse(this.responseText);
                const bindings = data.results.bindings;
                if (bindings && bindings.length > 0) {
                    setResult(bindings[0].comment.value);
                } else {
                    setResult('Not found.');
                }
                setLoading(false);
            }
        }

        xhr.open('GET', queryUrl);
        xhr.send();
    }, [steps]);

    const triggetNext = () => {
        setTrigger(true);
        triggerNextStep();
    };

    return (
        <div className="dbpedia">
            {loading ? <Loading /> : result}
            {!loading && (
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    {!trigger && (
                        <button onClick={triggetNext}>
                            Search Again
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

DBPedia.propTypes = {
    steps: PropTypes.object,
    triggerNextStep: PropTypes.func,
};

DBPedia.defaultProps = {
    steps: undefined,
    triggerNextStep: undefined,
};

const ExampleDBPedia = () => (
    <ChatBot
        steps={[
            {
                id: '1',
                message: 'Type something to search on Wikipédia. (Ex.: Brazil)',
                trigger: 'search',
            },
            {
                id: 'search',
                user: true,
                trigger: '3',
            },
            {
                id: '3',
                component: <DBPedia />,
                waitAction: true,
                trigger: '1',
            },
        ]}
    />
);

export default ExampleDBPedia;

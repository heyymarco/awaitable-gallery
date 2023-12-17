'use client';
// react:
import { 
// react:
default as React, 
// hooks:
useState, useEffect, } from 'react';
// reusable-ui components:
import { 
// base-components:
Basic, Content, 
// status-components:
Busy, 
// composite-components:
Masonry, } from '@reusable-ui/components'; // a set of official Reusable-UI components
// internals:
import { useAwaitableGalleryStyleSheet, } from './styles/loader';
export const AwaitableGallery = (props) => {
    // styles:
    const styleSheet = useAwaitableGalleryStyleSheet();
    // rest props:
    const { 
    // values:
    searchId, 
    // apis:
    checkStatusApi, poolInterval = 1000, ...restContentProps } = props;
    // states:
    const [images, setImages] = useState('idle');
    // effects:
    useEffect(() => {
        // conditions:
        if (searchId === null) {
            setImages('pending');
            return;
        }
        if (!searchId)
            return;
        if (!checkStatusApi)
            return;
        // actions:
        (async () => {
            const checkIsReady = async () => {
                let result;
                try {
                    result = await checkStatusApi(searchId);
                }
                catch (error) {
                    result = error;
                } // try
                setImages(result);
                return result;
            };
            const scheduleCheckIsReady = async () => {
                if ((await checkIsReady()) !== 'pending')
                    return;
                setTimeout(scheduleCheckIsReady, poolInterval);
            };
            scheduleCheckIsReady();
        })();
    }, [searchId, checkStatusApi, poolInterval]);
    // jsx:
    if (searchId === undefined)
        return null;
    return (React.createElement(Content
    // other props:
    , { ...restContentProps, 
        // variants:
        theme: (images instanceof Error) ? 'danger' : props.theme, 
        // classes:
        mainClass: props.mainClass ?? styleSheet.main },
        (images instanceof Error) &&
            React.createElement(Basic, { className: 'error', theme: 'danger' }, "Oops! An error occured."),
        (images === 'pending') &&
            React.createElement(Busy, { className: 'busy', theme: 'primary', size: 'lg' }),
        Array.isArray(images) &&
            React.createElement(Masonry, { className: 'images', nude: true }, images.map((image, index) => React.createElement("img", { key: index, src: image, alt: '' })))));
};

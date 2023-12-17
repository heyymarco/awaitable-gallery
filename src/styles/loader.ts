// cssfn:
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook



// styles:
// import './styles.js';
export const useAwaitableGalleryStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */'./styles.js')
, { id: 'awaitable-gallery' });

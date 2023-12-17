/// <reference types="react" />
import { ContentProps } from '@reusable-ui/components';
export type CheckStatusCallback = (searchId: string) => Promise<string[] | 'pending' | Error>;
export interface AwaitableGalleryProps extends Omit<ContentProps, 'children'> {
    searchId?: string | null;
    checkStatusApi?: CheckStatusCallback;
    poolInterval?: number;
}
export declare const AwaitableGallery: (props: AwaitableGalleryProps) => JSX.Element | null;

declare module "react-mentions" {
    import * as React from "react";

    /**
     * MentionsInput is the main component rendering the textarea control. It takes one or multiple Mention components as its children.
     */
    export const MentionsInput: MentionsInputClass;

    /**
     * Each Mention component represents a data source for a specific class of mentionable objects, such as users, template variables, issues, etc.
     */
    export const Mention: React.SFC<MentionProps>;

    /**
     * The properties for the @see MentionsInput component.
     */
    export interface MentionsInputProps {
        /**
         * If set to `true` a regular text input element will be rendered
         * instead of a textarea
         */
        singleLine?: boolean;
        /**
         * If set to `true` spaces will not interrupt matching suggestions
         */
        allowSpaceInQuery?: boolean;
        markup?: string;
        value?: string;
        displayTransform?: DisplayTransformFunc;
        onChange?: OnChangeHandlerFunc
        placeholder?: string;
        onBlur?: (event: any, clickedSuggestion: boolean) => void;
        onSelect?: (event: React.UIEvent) => void;
        onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement> | React.KeyboardEvent<HTMLInputElement>) => void;
        children: React.ReactElement<any>;
        className?: string;
        style?: any;
        regex?: RegExp;
        suggestionsPortalHost?: Element
    }

    /**
     * Exposes the type for use with the @see MentionsInputComponent.wrappedInstance which is added by react-mentions' use of substyle (https://github.com/jfschwarz/substyle).
     */
    interface MentionsInputComponentUnrwapped extends React.Component<MentionsInputProps> {
        inputRef?: HTMLInputElement | HTMLTextAreaElement
    }

    /**
     * Used with @see React.RefObject<MentionsInputComponent>.
     */
    interface MentionsInputComponent extends React.Component<MentionsInputProps> {
        // MentionsInput uses substyle (https://github.com/jfschwarz/substyle) which adds this wrappedInstance
        wrappedInstance?: MentionsInputComponentUnrwapped
    }

    /**
     * Used to reference MentionsInput element in a TSX file.
     */
    interface MentionsInputClass extends React.ComponentClass<MentionsInputProps> {
    }

    /**
     * Props definition for a mention subelement.
     */
    export interface MentionProps {
        onAdd?: (id: string | number, display:string) => void;
        renderSuggestion?: (suggestion: SuggestionDataItem, search: string, highlightedDisplay: React.ReactNode, index: number) => React.ReactNode;
        className?: string;
        trigger: string | RegExp;
        isLoading?: boolean;
        data: SuggestionDataItem[] | DataFunc;
        style?: any;
        appendSpaceOnAdd?: boolean
    }

    /**
     * The shape of a mention.
     */
    export interface MentionItem {
        display: string;
        id: string;
        type: null;
    }

    /**
     * Defines the function signature for implementing @see MentionsInputProps.displayTransform
     */
    export interface DisplayTransformFunc {
        (id: string, display:string, type:string): string
    }

    /**
     * Defines the function signature for implementing @see MentionsInputProps.onChange
     */
    export interface OnChangeHandlerFunc {
        (event: { target: { value: string } }, newValue: string, newPlainTextValue: string, mentions: Array<MentionItem>): void
    }

    /**
     * The shape of suggestion items.
     */
    export interface SuggestionDataItem {
        id: string | number,
        display: string,
    }

    /**
     * The function to implement asynchronous loading of suggestions in @see MentionProps.data .
     */
    interface DataFunc {
        (query: string, callback: (data: SuggestionDataItem[]) => void): void | SuggestionDataItem[]
    }    
}

declare module "react-mentions/lib/utils" {
    import { DisplayTransformFunc } from "react-mentions"
    /**
     * For the passed character index in the plain text string, returns the corresponding index in the marked up value string.
     * If the passed character index lies inside a mention, the value of `inMarkupCorrection` defines the correction to apply:
     * - 'START' to return the index of the mention markup's first char (default)
     * - 'END' to return the index after its last char
     * - 'NULL' to return null
     */
    export const mapPlainTextIndex: (
        value: string,
        markup: string,
        indexInPlainText: number,
        inMarkupCorrection: string,
        displayTransform: DisplayTransformFunc,
        regex: RegExp
    ) => number;
}

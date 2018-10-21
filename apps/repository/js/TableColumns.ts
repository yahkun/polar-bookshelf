import {createListOptionTypeMap, ListOptionType, ListOptionTypeMap} from '../../../web/js/ui/list_selector/ListSelector';
import {KeyValueMapping} from '../../../web/js/util/KeyValueMapping';

export class TableColumns implements KeyValueMapping<TableColumns, ListOptionType> {

    public readonly title: ListOptionType = {
        id: "title",
        label: "Title",
        selected: true,
        title: "The main title the document."
    };

    public readonly lastUpdated: ListOptionType =  {
        id: "lastUpdated",
        label: "Last Updated",
        selected: true,
        title: "The last time the documented was updated (tagged, annotated, etc)."

    };

    public readonly added: ListOptionType =  {
        id: "added",
        label: "Added",
        selected: true
    };

    public readonly progress: ListOptionType =  {
        id: "progress",
        label: "Progress",
        selected: true
    };

    public readonly tags: ListOptionType =  {
        id: "tags",
        label: "Tags",
        selected: false,
    };

    public readonly nrAnnotations: ListOptionType =  {
        id: "nrAnnotations",
        label: "Annotations",
        selected: false,
        title: "The number of annotations in the document (comments, highlights, etc)."
    };

    public readonly flagged: ListOptionType =  {
        id: "flagged",
        label: "Flagged",
        selected: true
    };

    public readonly archived: ListOptionType =  {
        id: "archived",
        label: "Archived",
        selected: true
    };

}

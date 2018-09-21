import {DocAnnotationIndex} from './DocAnnotationIndex';
import {DocAnnotation, SortedDocAnnotations} from './DocAnnotation';

export class DocAnnotationIndexes {

    public static delete(docAnnotationIndex: DocAnnotationIndex,
                         ...ids: string[]): DocAnnotationIndex {

        const docAnnotationMap = Object.assign({}, docAnnotationIndex.docAnnotationMap);

        for (const id of ids) {
            delete docAnnotationMap[id];
        }

        const tmpIndex = new DocAnnotationIndex(docAnnotationMap, Object.values(docAnnotationMap));
        return this.rebuild(tmpIndex);

    }

    public static rebuild(docAnnotationIndex: DocAnnotationIndex,
                          ...docAnnotations: DocAnnotation[]): DocAnnotationIndex {

        const docAnnotationMap = Object.assign({}, docAnnotationIndex.docAnnotationMap);
        let sortedDocAnnotations: SortedDocAnnotations = [];


        for (const docAnnotation of docAnnotations) {
            docAnnotationMap[docAnnotation.id] = docAnnotation;
        }

        sortedDocAnnotations.push(...Object.values(docAnnotationMap));

        function sortScore(item: DocAnnotation) {
            return (item.pageNum * 100000) + (item.position.y * 100) + item.position.x;
        }

        // now sort the doc annotations so that they're in the order we need them.
        sortedDocAnnotations = sortedDocAnnotations.sort((a, b) => {

            const diff = sortScore(a) - sortScore(b);

            if (diff === 0) {
                return a.id.localeCompare(b.id);
            }

            return diff;

        });

        return new DocAnnotationIndex(docAnnotationMap, sortedDocAnnotations);

    }

}

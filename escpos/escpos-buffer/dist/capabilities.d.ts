export declare type Font = {
    name: string;
    columns: number;
};
export declare type CodePage = {
    code: string;
    command: string;
};
export declare type Capability = {
    profile: string;
    brand: string;
    model: string;
    name?: string;
    columns: number;
    feed?: number;
    fonts: Font[];
    codepage: string;
    initialize?: string;
    codepages: CodePage[];
};
declare const _default: {
    models: ({
        model: string;
        profile: string;
        columns?: undefined;
        feed?: undefined;
        fonts?: undefined;
        name?: undefined;
        brand?: undefined;
    } | {
        model: string;
        profile: string;
        columns: number;
        feed: number;
        fonts: {
            name: string;
            columns: number;
        }[];
        name?: undefined;
        brand?: undefined;
    } | {
        model: string;
        profile: string;
        feed: number;
        columns?: undefined;
        fonts?: undefined;
        name?: undefined;
        brand?: undefined;
    } | {
        model: string;
        profile: string;
        columns: number;
        fonts: {
            name: string;
            columns: number;
        }[];
        feed?: undefined;
        name?: undefined;
        brand?: undefined;
    } | {
        model: string;
        profile: string;
        name: string;
        columns?: undefined;
        feed?: undefined;
        fonts?: undefined;
        brand?: undefined;
    } | {
        model: string;
        profile: string;
        brand: string;
        columns?: undefined;
        feed?: undefined;
        fonts?: undefined;
        name?: undefined;
    })[];
    profiles: {
        epson: {
            brand: string;
            columns: number;
            feed: number;
            codepage: string;
            fonts: {
                name: string;
                columns: number;
            }[];
            codepages: {
                cp437: string;
                cp930: string;
                cp850: string;
                cp860: string;
                cp863: string;
                cp865: string;
                cp1252: string;
                cp866: string;
                cp852: string;
                cp858: string;
            };
        };
        bematech: {
            brand: string;
            columns: number;
            feed: number;
            codepage: string;
            fonts: {
                name: string;
                columns: number;
            }[];
            initialize: string;
            codepages: {
                cp850: string;
                cp437: string;
                cp860: string;
                cp858: string;
                cp866: string;
                cp864: string;
                utf8: string;
                big5e: string;
                jis: string;
                shiftjis: string;
                gb2312: string;
            };
        };
        elgin: {
            profile: string;
            brand: string;
            feed: number;
            codepages: {
                cp1252: string;
                cp850: string;
                cp437: string;
                cp860: string;
                cp858: string;
            };
        };
        sweda: {
            profile: string;
            feed: number;
            brand: string;
        };
        dataregis: {
            profile: string;
            brand: string;
        };
        daruma: {
            brand: string;
            profile: string;
            columns: number;
            feed: number;
            codepage: string;
            fonts: {
                name: string;
                columns: number;
            }[];
            codepages: {
                iso88591: string;
                cp850: string;
                cp1252: string;
                cp437: string;
            };
        };
        diebold: {
            brand: string;
            profile: string;
            codepages: {
                cp1252: string;
                cp850: string;
                cp437: string;
            };
        };
        controlid: {
            profile: string;
            brand: string;
            columns: number;
            feed: number;
            fonts: {
                name: string;
                columns: number;
            }[];
        };
        perto: {
            profile: string;
            brand: string;
            columns: number;
            codepage: string;
            fonts: {
                name: string;
                columns: number;
            }[];
        };
        generic: {
            brand: string;
            codepage: string;
            columns: number;
            fonts: {
                name: string;
                columns: number;
            }[];
            initialize: string;
            codepages: {
                cp437: string;
                cp930: string;
                cp850: string;
                cp860: string;
                cp863: string;
                cp865: string;
                cp1252: string;
                cp866: string;
                cp852: string;
                cp858: string;
                cp1253: string;
                cp737: string;
                cp857: string;
                iso88599: string;
                cp864: string;
                cp862: string;
                iso88592: string;
            };
        };
    };
};
export default _default;

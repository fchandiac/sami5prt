import { Profile } from './profile';
import { Capability } from './capabilities';
export default class Model {
    private _profile;
    constructor(model: string | Profile);
    instance(capability: Capability): Profile;
    static ASSIGN_DEFINED(target: object, ...others: object[]): object;
    static FIND(model: string): object;
    static EXPAND(profile: object): Capability;
    static ALL(): Capability[];
    get name(): string;
    get profile(): Profile;
}

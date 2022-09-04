import { ISpeciesPokemonResponse } from './ISpeciesPokemonResponse';

interface IDefaultData {
    name: string;
    url: string;
}

interface IType extends IDefaultData {}

interface IAbility {
    ability: ISingleAbility;
    is_hidden: boolean;
    slot: number;
}

interface ISingleAbility extends IDefaultData {}

interface IForm extends IDefaultData {}

interface IGameIndices {
    game_index: string;
    version: IVersion;
}

interface IVersion extends IDefaultData {}

interface IItem extends IDefaultData {}

interface IVersionDetail {
    rarity: number;
}

interface IHeldItems {
    item: IItem;
    version_details: Array<IVersionDetail>;
}

interface ISingleMove extends IDefaultData {}

interface IMoveLearnMethod extends IDefaultData {}

interface IVersionGroup extends IDefaultData {}

interface IVersionGroupDetails {
    level_learned_at: string;
    move_learn_method: IMoveLearnMethod;
    version_group: IVersionGroup;
}

interface IMove {
    move: ISingleMove;
    version_group_details: Array<IVersionGroupDetails>;
}

interface ISpecies extends IDefaultData {}

interface IStats {
    base_stat: number;
    effort: number;
    stat: ISingleStat
}

interface ISingleStat extends IDefaultData {}

interface ITypes {
    slot: number;
    type: IType
}

interface ISprites {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
}

export interface ISinglePokemonResponse {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: Array<IAbility>;
    forms: Array<IForm>;
    game_indicies: Array<IGameIndices>;
    held_items: Array<IHeldItems>;
    location_area_encounters: string;
    moves: Array<IMove>;
    species: ISpecies;
    sprites: ISprites;
    stats: Array<IStats>;
    types: Array<ITypes>;
    past_types: Array<any>;
    evolution_chain: ISpeciesPokemonResponse;
};
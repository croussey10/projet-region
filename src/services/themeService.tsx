import {supabase} from "../supabaseClient.tsx";

export interface ThemeStat {
    theme: string;
    moyenne_points: number;
}

export interface RawThemeData {
    uid: string;
    name: string;
    category: {
        uid: string;
        name: string;
        reponse: {
            uid: string;
            reponse_text: string;
            points: number;
            target_role: string;
        }[];
    }[];
}

export const getThemeStats = async (userId: string, order: 'ASC' | 'DESC'): Promise<ThemeStat[]> => {
    const query = supabase
        .from('theme_stats_view')
        .select('theme, moyenne_points')
        .eq('profile_id', userId)
        .order('moyenne_points', { ascending: order === 'ASC' })
        .limit(3);

    const { data, error } = await query;

    if (error) throw error;
    return (data as unknown as ThemeStat[]) || [];
};

export const getFullQuestionnaire = async (role: 'manager' | 'agent'): Promise<RawThemeData[]> => {
    const { data, error } = await supabase
        .from('theme')
        .select(`
            uid, name,
            category (
                uid, name,
                reponse (uid, reponse_text, points, target_role)
            )
        `)
        .eq('category.reponse.target_role', role);

    if (error) throw error;
    return (data as unknown as RawThemeData[]) || [];
};
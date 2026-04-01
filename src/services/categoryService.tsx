import {supabase} from "../supabaseClient.tsx";

export const getCategoryWithTheme = async () => {
    const { data, error } = await supabase
        .from('category')
        .select(`
            uid,
            name,
            theme (
                name
            )
        `)
    console.log("RÉPONSE SUPABASE -> Data:", data, "Error:", error);
    if (error) throw error;
    return data;
};

export const getCategoryWithReponse = async () => {
    const { data, error } = await supabase
        .from('category')
        .select(`
            uid,
            name,
            theme (
                name
            ),
            reponse (
                uid,
                reponse_text,
                points,
                target_role
            )
        `);
    if (error) throw error;
    return data;
};
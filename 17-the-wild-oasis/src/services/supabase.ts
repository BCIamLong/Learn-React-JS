import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY } from "../configs/supabase";

const supabaseUrl = "https://xyinqkbbdbmknpwnrucc.supabase.co";
const supabase = createClient(supabaseUrl, SUPABASE_KEY!);

export default supabase;

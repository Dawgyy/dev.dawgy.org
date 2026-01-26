import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useViewCounter(slug: string) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    if (!supabase || !slug) return;

    const client = supabase;
    const storageKey = `viewed:${slug}`;

    const updateViews = async (increment: boolean) => {
      try {
        if (increment) {
          const { error: incrementError } = await client.rpc('increment_view', {
            slug_input: slug,
          });

          if (incrementError) {
            console.error('Error incrementing views:', incrementError);
          }
        }

        const { data, error: fetchError } = await client
          .from('views')
          .select('count')
          .eq('slug', slug)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          console.error('Error fetching views:', fetchError);
        }

        if (data) {
          setViews(data.count);
        } else {
          setViews(1);
        }
      } catch (err) {
        console.error('Unexpected error in view counter:', err);
      }
    };

    const hasViewed =
      typeof window !== 'undefined' &&
      window.sessionStorage.getItem(storageKey) === 'true';

    updateViews(!hasViewed);

    if (!hasViewed && typeof window !== 'undefined') {
      window.sessionStorage.setItem(storageKey, 'true');
    }
  }, [slug]);

  return views;
}

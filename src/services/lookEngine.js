import looks from "../data/looks.json";

export function getTrendingLooks({ undertone, depth }) {
  return looks.filter((look) => {
    const undertoneMatch = look.tags.undertone.includes(undertone);
    const depthMatch = depth >= look.tags.depthRange[0] && depth <= look.tags.depthRange[1];
    return undertoneMatch && depthMatch;
  });
}

interface TechBadgeProps {
  tech: string;
  size?: 'sm' | 'md';
}

export function TechBadge({ tech, size = 'md' }: TechBadgeProps) {
  const sizeClasses = size === 'sm'
    ? 'px-2 py-1 text-xs rounded'
    : 'px-3 py-1 text-sm rounded-full';

  return (
    <span className={`${sizeClasses} bg-primary/20 text-primary border border-primary/30`}>
      {tech}
    </span>
  );
}

import React, { useRef, useEffect } from 'react';

interface UseSwipeNavigationOptions<T extends string> {
  items: T[];
  activeItem: T;
  onSelect: (item: T) => void;
  minSwipeDistance?: number;
  ignoreScrollableChildren?: boolean;
  onSwipeFeedback?: (direction: 'left' | 'right', targetItem: T) => void;
}

/**
 * Provides touch swipe-left and swipe-right gesture handlers for cycling
 * through ordered tabs, modules, or portals on mobile devices.
 */
export function useSwipeNavigation<T extends string>({
  items,
  activeItem,
  onSelect,
  minSwipeDistance = 45,
  ignoreScrollableChildren = false,
  onSwipeFeedback
}: UseSwipeNavigationOptions<T>) {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isIgnoredTarget = useRef<boolean>(false);

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;

    if (ignoreScrollableChildren) {
      const target = e.target as HTMLElement | null;
      if (target) {
        // Do not hijack touch events inside horizontally scrollable tables, inputs, or sliders
        const interactiveParent = target.closest(
          'table, input, textarea, select, [data-no-swipe="true"]'
        );
        if (interactiveParent) {
          isIgnoredTarget.current = true;
          return;
        }
      }
    }

    isIgnoredTarget.current = false;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (
      isIgnoredTarget.current ||
      touchStartX.current === null ||
      touchStartY.current === null ||
      e.changedTouches.length === 0
    ) {
      touchStartX.current = null;
      touchStartY.current = null;
      return;
    }

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    // Must be primarily a horizontal gesture (deltaX > 1.35 * deltaY) and exceed minSwipeDistance
    if (Math.abs(deltaX) < minSwipeDistance || Math.abs(deltaX) < Math.abs(deltaY) * 1.35) {
      return;
    }

    const currentIndex = items.indexOf(activeItem);
    if (currentIndex === -1 || items.length < 2) return;

    if (deltaX < 0) {
      // Swiped Left -> Next item
      const nextIndex = (currentIndex + 1) % items.length;
      const nextItem = items[nextIndex];
      onSelect(nextItem);
      onSwipeFeedback?.('left', nextItem);
    } else {
      // Swiped Right -> Previous item
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      const prevItem = items[prevIndex];
      onSelect(prevItem);
      onSwipeFeedback?.('right', prevItem);
    }
  };

  return {
    onTouchStart,
    onTouchEnd
  };
}

/**
 * Automatically scrolls the active pill/button into the horizontal center
 * of a scrollable navigation bar ONLY when activeKey changes, without
 * affecting vertical window scroll or jumping on page load.
 */
export function useAutoScrollActivePill(activeKey: string) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip on initial mount so page load never auto-scrolls down to nested tab bars
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const activeEl = container.querySelector<HTMLElement>(
      `[data-nav-id="${activeKey}"]`
    );
    if (!activeEl) return;

    // Calculate horizontal offset strictly relative to the container element
    // NEVER use scrollIntoView() which scrolls the entire window/viewport
    const containerRect = container.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();

    const currentScrollLeft = container.scrollLeft;
    const targetScrollLeft =
      currentScrollLeft +
      (elRect.left - containerRect.left) -
      containerRect.width / 2 +
      elRect.width / 2;

    container.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: 'smooth'
    });
  }, [activeKey]);

  return containerRef;
}

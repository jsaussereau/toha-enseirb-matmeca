const VIEW_MODE_STORAGE_KEY = 'toha:list-view-mode';

function setListViewMode(mode) {
  const sectionView = document.getElementById('section-card-view');
  const postView = document.getElementById('post-list-view');
  const paginator = document.getElementById('post-list-paginator');

  const showSections = mode === 'sections' && sectionView;

  if (sectionView) {
    sectionView.classList.toggle('d-none', !showSections);
  }
  if (postView) {
    postView.classList.toggle('d-none', !!showSections);
  }
  if (paginator) {
    paginator.classList.toggle('d-none', !!showSections);
  }
}

function initListViewModeSwitcher() {
  const selector = document.getElementById('list-view-mode');
  if (!selector) return;

  const hasSections = !!document.getElementById('section-card-view');

  const defaultMode = selector.dataset.defaultMode || 'posts';
  const savedMode = window.localStorage?.getItem(VIEW_MODE_STORAGE_KEY);
  const initialMode = savedMode || defaultMode;
  const effectiveMode = hasSections && initialMode === 'sections' ? 'sections' : 'posts';

  selector.value = effectiveMode;
  setListViewMode(effectiveMode);

  selector.addEventListener('change', () => {
    const nextMode = hasSections && selector.value === 'sections' ? 'sections' : 'posts';
    selector.value = nextMode;
    setListViewMode(nextMode);
    window.localStorage?.setItem(VIEW_MODE_STORAGE_KEY, nextMode);
  });
}

window.addEventListener('DOMContentLoaded', initListViewModeSwitcher);

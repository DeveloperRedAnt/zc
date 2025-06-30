import { Button } from '@/components/button/button';
import { useTranslation } from '@/libs/i18n';
import { ChevronDown, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

// Tipe data untuk permission category
export interface PermissionCategory {
  title: string;
  permissions: string[];
}

// Tipe data untuk permission section
export interface PermissionSection {
  id: string;
  title: string;
  permissionCount: number;
  jabatan: string;
  categories: PermissionCategory[];
}

interface PermissionListProps {
  sections: PermissionSection[];
  initiallyExpanded?: string | null;
}

const PermissionList: React.FC<PermissionListProps> = ({ sections, initiallyExpanded = null }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(initiallyExpanded);
  const { t } = useTranslation();

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="rounded-2xl shadow-sm p-8 mt-3">
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="border border-gray-200 rounded-xl overflow-hidden">
            <Button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-100 transition-colors h-16"
            >
              <div className="flex items-center gap-3">
                {expandedSection === section.id ? (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                )}
                <span className="font-medium text-gray-800">{section.title}</span>
              </div>
              <span
                className="text-white text-xs px-3 py-1 font-medium"
                style={{ backgroundColor: 'var(--primary-bg)' }}
              >
                {section.permissionCount}{' '}
                {t('profile.userProfile.permissionDetail.permissionBadge')}
              </span>
            </Button>

            {expandedSection === section.id && (
              <div className="p-6 bg-white">
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-500 mb-2 block">
                    {t('profile.userProfile.permissionDetail.positionLabel')}
                  </label>
                  <p className="text-gray-700 mb-6">{section.jabatan}</p>
                </div>

                {section.categories.map((category) => (
                  <div
                    key={category.title}
                    className="bg-white rounded-xl border border-gray-200 mb-6"
                  >
                    <div className="p-4 border-b border-gray-100 bg-white rounded-t-xl">
                      <h3 className="text-lg font-semibold text-gray-800 mb-0">{category.title}</h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          category.permissions.slice(0, Math.ceil(category.permissions.length / 2)),
                          category.permissions.slice(Math.ceil(category.permissions.length / 2)),
                        ].map((column) => (
                          <div key={column.map((perm) => perm).join('-')}>
                            <ul className="space-y-2 text-gray-700">
                              {column.map((permission) => (
                                <li key={permission} className="flex items-center gap-2">
                                  <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: 'var(--dark-bg)' }}
                                  />{' '}
                                  {permission}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionList;

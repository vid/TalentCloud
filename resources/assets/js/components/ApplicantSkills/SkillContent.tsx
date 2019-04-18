import * as React from 'react';

interface SkillContentProps {
  skillsSectionTitle: string;
}

const SkillContent: React.FunctionComponent<SkillContentProps> = ({
  skillsSectionTitle,
}): React.ReactElement => {
  return (
    <div className="application-post__content-wrapper box lg-3of4">
      <a aria-hidden="true" className="application-post__anchor" id="begin" />
      {/* Skills Layout */}
      {/* Profile List (Soft Skills) */}
      <div className="profile-list">
        {/* Profile List Header */}
        <div className="profile-list__header flex-grid middle">
          <div className="box med-1of2">
            <h3>{skillsSectionTitle}</h3>
          </div>
          <div className="box med-1of2">{/* empty */}</div>
        </div>
        {/* Profile Element List */}
        <div class="profile-element-list" />
      </div>
    </div>
  );
};

export default SkillContent;

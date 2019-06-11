import * as React from "react";
import ReactDOM from "react-dom";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import { items } from "../ProgressTracker/fixtures/progressItems";
import IntroForm from "./IntroForm";

interface JobBuilderIntroProps {}

const JobBuilderIntro: React.FunctionComponent<
  JobBuilderIntroProps & InjectedIntlProps
> = (): React.ReactElement => {
  return (
    <section>
      <ProgressTracker
        items={items}
        backgroundColor="black"
        fontColor="white"
        classNames="manager-jpb-tracker"
        itemsWrapperClassNames="tracker manager-jpb-tracker-wrapper"
      />
      <div data-c-container="form" data-c-padding="top(triple) bottom(triple)">
        <h3
          data-c-font-size="h3"
          data-c-font-weight="bold"
          data-c-margin="bottom(normal)"
        >
          <FormattedMessage
            id="jobBuilder.intro.welcome"
            defaultMessage="EN Welcome to the Job Poster Builder"
            description="Header of Job Poster Builder Intro Step"
          />
        </h3>
        <p data-c-margin="bottom(normal)">
          This tool will help you create a job poster that attracts the right
          talent.
        </p>
        <p data-c-margin="bottom(double)">
          We’ve also provided instructions and examples to help guide you
          through the process but if you still have questions, contact{" "}
          <a
            href="mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca"
            title="Email Talent Cloud."
          >
            Talent Cloud
          </a>
        </p>
        <h4
          data-c-colour="c3"
          data-c-font-size="h4"
          data-c-margin="bottom(double)"
        >
          Before we get started please review your information.
        </h4>
        <IntroForm />
      </div>
    </section>
  );
};

export default injectIntl(JobBuilderIntro);

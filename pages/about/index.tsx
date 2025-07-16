import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Users, Award, Globe, Anchor, Heart, Shield } from "lucide-react";
import styles from "./about.module.css";

export default function AboutPage() {
  const { t } = useTranslation("common");

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerSection}>
        <div className={styles.headerContainer}>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>About DockNow</h1>
            <p className={styles.pageSubtitle}>
              Connecting boat owners with premium docking spaces worldwide.
              We're revolutionizing how maritime enthusiasts discover, book, and
              enjoy their time on the water.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.headerContainer}>
        <div className={styles.aboutContainer}>
          {/* Mission Section */}
          <section className={styles.missionSection}>
            <div className={styles.sectionContent}>
              <h2 className={styles.sectionTitle}>Our Mission</h2>
              <p className={styles.missionText}>
                To create a seamless platform that connects boat owners with the
                perfect docking spaces, enabling unforgettable maritime
                experiences while supporting local marina communities worldwide.
              </p>
            </div>
          </section>

          {/* Values Section */}
          <section className={styles.valuesSection}>
            <div className={styles.sectionContent}>
              <h2 className={styles.sectionTitle}>Our Values</h2>
              <div className={styles.valuesGrid}>
                <div className={styles.valueCard}>
                  <div className={styles.valueIcon}>
                    <Anchor size={32} />
                  </div>
                  <h3 className={styles.valueTitle}>Maritime Excellence</h3>
                  <p className={styles.valueDescription}>
                    We understand the unique needs of boat owners and marina
                    operators, ensuring every docking experience meets the
                    highest standards.
                  </p>
                </div>

                <div className={styles.valueCard}>
                  <div className={styles.valueIcon}>
                    <Globe size={32} />
                  </div>
                  <h3 className={styles.valueTitle}>Global Reach</h3>
                  <p className={styles.valueDescription}>
                    From Mediterranean marinas to Caribbean harbors, we connect
                    you with premium docking spaces in the world's most
                    beautiful destinations.
                  </p>
                </div>

                <div className={styles.valueCard}>
                  <div className={styles.valueIcon}>
                    <Shield size={32} />
                  </div>
                  <h3 className={styles.valueTitle}>Trust & Security</h3>
                  <p className={styles.valueDescription}>
                    Secure payments, verified marinas, and 24/7 support ensure
                    your booking experience is safe and reliable.
                  </p>
                </div>

                <div className={styles.valueCard}>
                  <div className={styles.valueIcon}>
                    <Heart size={32} />
                  </div>
                  <h3 className={styles.valueTitle}>Community First</h3>
                  <p className={styles.valueDescription}>
                    We support local marina communities and promote sustainable
                    maritime tourism that benefits everyone involved.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className={styles.statsSection}>
            <div className={styles.sectionContent}>
              <h2 className={styles.sectionTitle}>By the Numbers</h2>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>500+</div>
                  <div className={styles.statLabel}>Partner Marinas</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>50+</div>
                  <div className={styles.statLabel}>Countries</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>10K+</div>
                  <div className={styles.statLabel}>Happy Boaters</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>24/7</div>
                  <div className={styles.statLabel}>Support</div>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className={styles.teamSection}>
            <div className={styles.sectionContent}>
              <h2 className={styles.sectionTitle}>Our Team</h2>
              <p className={styles.teamDescription}>
                Our passionate team combines maritime expertise with
                cutting-edge technology to deliver the best docking experience
                possible.
              </p>
              <div className={styles.teamGrid}>
                <div className={styles.teamCard}>
                  <div className={styles.teamIcon}>
                    <Users size={24} />
                  </div>
                  <h3 className={styles.teamRole}>Maritime Experts</h3>
                  <p className={styles.teamBio}>
                    Seasoned professionals with decades of experience in marine
                    operations and harbor management.
                  </p>
                </div>
                <div className={styles.teamCard}>
                  <div className={styles.teamIcon}>
                    <Award size={24} />
                  </div>
                  <h3 className={styles.teamRole}>Technology Leaders</h3>
                  <p className={styles.teamBio}>
                    Innovative developers and designers creating seamless
                    digital experiences for the maritime industry.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className={styles.ctaSection}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to Set Sail?</h2>
              <p className={styles.ctaSubtitle}>
                Join thousands of boaters who trust DockNow for their docking
                needs.
              </p>
              <button className={styles.ctaButton}>Find Your Next Port</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

import React, { useState } from 'react';
import { Clock, Newspaper, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const PricingSection: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div style={{ fontFamily: '"Noto Sans JP", sans-serif', maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@700&family=Noto+Sans+JP:wght@400;700&display=swap');
      `}</style>

            {/* Hero / Top Area */}
            <h2 style={{
                textAlign: 'center',
                fontSize: '28px',
                fontWeight: '700',
                color: '#0F172A',
                marginBottom: '16px',
                letterSpacing: '0.05em'
            }}>
                料金について
            </h2>
            <p style={{
                textAlign: 'center',
                fontSize: '14px',
                color: '#64748B',
                lineHeight: '1.8',
                marginBottom: '60px'
            }}>
                シンプルな料金プランでわかりやすく。月額30万円で、<br />AI専門家チームに月30時間分の業務を依頼できます。
            </p>

            {/* Pricing Card - Angular & Sharp Design */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    maxWidth: '850px',
                    margin: '0 auto 60px',
                    background: '#fff',
                    border: '1px solid #E2E8F0',
                    // Sharp edges as requested
                    borderRadius: '0px',
                    boxShadow: isHovered
                        ? '0 20px 40px -5px rgba(33, 150, 243, 0.15)'
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Top Accent Line */}
                <div style={{
                    height: '4px',
                    background: 'linear-gradient(90deg, #00BCD4 0%, #2196F3 50%, #1A237E 100%)',
                    width: '100%'
                }} />

                <div style={{ padding: '60px 40px', textAlign: 'center' }}>

                    {/* Badge */}
                    <div style={{
                        display: 'inline-block',
                        padding: '6px 16px',
                        background: '#F1F5F9',
                        color: '#1A237E',
                        fontSize: '12px',
                        fontWeight: '700',
                        letterSpacing: '0.1em',
                        marginBottom: '24px',
                        border: '1px solid #CBD5E1',
                        borderRadius: '0px' // Sharp
                    }}>
                        STANDARD PLAN
                    </div>

                    <h3 style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#0F172A',
                        marginBottom: '40px',
                        letterSpacing: '0.02em'
                    }}>
                        OTASUKE AI
                    </h3>

                    {/* Amount Section with Glassmorphism-ish sharp feel */}
                    <div style={{
                        background: 'linear-gradient(135deg, #1A237E 0%, #2196F3 100%)',
                        padding: '40px',
                        position: 'relative',
                        marginBottom: '40px',
                        color: '#fff',
                        clipPath: 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)' // Angular cut
                    }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                            <span style={{ fontSize: '16px', opacity: 0.9, marginRight: '8px' }}>月額</span>
                            <span style={{
                                fontSize: '80px',
                                fontWeight: '700',
                                fontFamily: '"DM Sans", sans-serif',
                                lineHeight: 1,
                                letterSpacing: '-0.02em'
                            }}>30</span>
                            <span style={{ fontSize: '24px', fontWeight: '700', marginLeft: '4px' }}>万円</span>
                            <span style={{ fontSize: '14px', opacity: 0.8, marginLeft: '8px' }}>（税別）</span>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '30px',
                        marginBottom: '50px'
                    }}>
                        <FeatureItem
                            icon={<Clock size={24} />}
                            label="月間稼働時間"
                            value="30"
                            unit="時間"
                        />
                        <FeatureItem
                            icon={<Newspaper size={24} />}
                            label="毎日届く"
                            value="AIニュース"
                            unit=""
                        />
                        <FeatureItem
                            icon={<FileText size={24} />}
                            label="最低契約期間"
                            value="1"
                            unit="ヶ月〜"
                        />
                    </div>

                    {/* CTA Button */}
                    <a
                        href="/contact/"
                        style={{
                            display: 'inline-block',
                            background: 'linear-gradient(90deg, #00BCD4 0%, #2196F3 100%)',
                            color: '#fff',
                            padding: '18px 60px',
                            fontSize: '16px',
                            fontWeight: '700',
                            textDecoration: 'none',
                            borderRadius: '0px', // Sharp
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
                            letterSpacing: '0.05em'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(33, 150, 243, 0.5)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(33, 150, 243, 0.3)';
                        }}
                    >
                        お問い合わせ・資料請求はこちら
                    </a>

                </div>
            </motion.div>

        </div>
    );
};

const FeatureItem = ({ icon, label, value, unit }: { icon: React.ReactNode, label: string, value: string, unit: string }) => (
    <div style={{ textAlign: 'center' }}>
        <div style={{
            width: '50px',
            height: '50px',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            color: '#2196F3'
        }}>
            {icon}
        </div>
        <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px', fontWeight: '600' }}>{label}</div>
        <div style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A' }}>
            {value}<span style={{ fontSize: '14px', marginLeft: '2px', color: '#2196F3' }}>{unit}</span>
        </div>
    </div>
);

export default PricingSection;

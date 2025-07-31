import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import styles from './UseOfData.module.scss'

export default function UseOfData() {
  const navigate = useNavigate()
  return (
    <div className={styles.useOfDataPage}>
      <Header title="Use of Personal Data" onExit={() => navigate('/')} />
      <div className={styles.content}>
        <p>
          To provide you with the most accurate and personalized virtual try-on experience, our solution creates a realistic 3D avatar based on your body profile. This avatar helps simulate how clothing will look and fit on your unique physique. To achieve this, we use a combination of manual input and advanced machine learning techniques based on the following personal data:
        </p>
        <div className={styles.sectionTitle}>Personal Data We Use</div>
        <ul className={styles.dataList}>
          <li><b>Age Range</b>: Your age range helps us estimate typical body composition associated with your life stage. This ensures your avatar reflects realistic proportions and characteristics.</li>
          <li><b>Height</b>: Establishes the overall scale of your avatar and provides proportional accuracy across limbs and torso.</li>
          <li><b>Weight</b>: Used alongside height to determine overall body mass and shape, which impacts clothing fit and avatar realism.</li>
          <li><b>Body Shape</b>: Helps us model the overall silhouette and balance of your avatar’s torso, hips, and shoulders.</li>
          <li><b>Fitness Level</b>: Provides insight into muscle tone, body composition, contributing to a more lifelike and personalized avatar.</li>
          <li><b>Main Measurements (Chest, Waist, Hips)</b>: Key for defining torso proportions and ensuring a precise digital fit.</li>
          <li><b>Body Photos</b>: Front and side photos of your body are used by our machine learning models to extract precise body measurements. This enables us to automatically and accurately replicate your real-world shape in 3D.</li>
          <li><b>Face Photos</b>: Front and side photos of your face allows us to generate a realistic facial likeness for your avatar. This step is optional but enhances the personalization of your digital twin.</li>
        </ul>
        <div className={styles.sectionTitle}>Why We Collect This Information</div>
        <p>
          All of this data is used solely to create a more precise and realistic digital twin avatar. This allows the app to:
        </p>
        <ul className={styles.dataList}>
          <li>Create a highly accurate 3D avatar tailored to your actual body</li>
          <li>Simulate garment fit, size, and style with precision</li>
          <li>Improve clothing recommendations based on your true measurements</li>
          <li>Offer a realistic and confidence-boosting try-on experience</li>
        </ul>
        <div className={styles.privacyTitle}>Your Privacy Matters</div>
        <ul className={styles.privacyList}>
          <li><b>Consent-based:</b> All data is collected only with your clear permission.</li>
          <li><b>Secure storage:</b> Photos and personal data are encrypted and stored securely, deleted right after creating your 3D model.</li>
          <li><b>Strict usage:</b> Your data is used exclusively for avatar creation and virtual try-on.</li>
          <li><b>No sharing:</b> We never share your data or images with third parties without your explicit consent.</li>
        </ul>
      </div>
      <button className={styles.backButtonUseofdata} onClick={() => navigate('/avatar-info')}>Back</button>
    </div>
  )
}

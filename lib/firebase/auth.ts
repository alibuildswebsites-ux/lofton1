import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../../firebase.config';

// Sign up with email and password
export const signUpWithEmail = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update profile with name
    await updateProfile(user, { displayName: name });
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name: name,
      email: email,
      savedProperties: [],
      createdAt: new Date().toISOString()
    });
    
    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user document exists
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    // If new user, create document
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: user.displayName || 'User',
        email: user.email,
        savedProperties: [],
        createdAt: new Date().toISOString()
      });
    }
    
    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Sign out
export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Send password reset email
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Update user profile name
export const updateUserName = async (user: User, newName: string) => {
  try {
    await updateProfile(user, { displayName: newName });
    await setDoc(doc(db, 'users', user.uid), { name: newName }, { merge: true });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Update user password
export const updateUserPassword = async (user: User, newPassword: string) => {
  try {
    await updatePassword(user, newPassword);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
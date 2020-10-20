package software.pocket.calculator;

import android.os.Bundle;
import android.content.res.Configuration;

import com.facebook.react.ReactActivity;
import com.zoontek.rnbootsplash.RNBootSplash;

import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "calculator";
  }

  @Override
    protected void onCreate(Bundle savedInstanceState) {
        int drawableId = (getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK) == Configuration.UI_MODE_NIGHT_YES
                    ? R.drawable.bootsplash_dark
                    : R.drawable.bootsplash_light;
      RNBootSplash.init(drawableId, MainActivity.this);
      super.onCreate(savedInstanceState);
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
      return new ReactActivityDelegate(this, getMainComponentName()) {
        @Override
        protected ReactRootView createRootView() {
         return new RNGestureHandlerEnabledRootView(MainActivity.this);
        }
      };
    }
}
